import { useState, useEffect, useRef, useCallback } from 'react';
import { PSO } from './algorithms/pso.js';
import { DifferentialEvolution } from './algorithms/de.js';
import { getBenchmark, makeSurface, defaultBounds, BENCHMARK_META } from './algorithms/benchmarks.js';

// ─────────────────────────────────────────────────────────────────────────────
// META — descriptions.py + app.py config
// ─────────────────────────────────────────────────────────────────────────────
const ALGO_META = {
  pso: {
    name:  'PSO — Enjambre de Partículas',
    short: 'PSO',
    primary: '#f39c12', rgb: '243,156,18',
    wiki: 'https://es.wikipedia.org/wiki/Optimizaci%C3%B3n_por_enjambre_de_part%C3%ADculas',
    desc: 'PSO simula partículas que se desplazan por el espacio de búsqueda. Cada partícula actualiza su velocidad usando su mejor posición individual y la mejor posición global del enjambre.',
    equations: ['vᵢ ← w·vᵢ + c₁r₁(pBest − xᵢ) + c₂r₂(gBest − xᵢ)', 'xᵢ ← clip(xᵢ + vᵢ)'],
    params: [
      { key:'w',  label:'w  (Inercia)',      min:0.1, max:1.0,  step:0.05, def:0.7,  dec:2, tip:'Cuánto momentum conserva cada partícula' },
      { key:'c1', label:'c1 (Cognitivo)',    min:0.5, max:3.0,  step:0.05, def:1.6,  dec:2, tip:'Atracción hacia la mejor posición personal' },
      { key:'c2', label:'c2 (Social)',       min:0.5, max:3.0,  step:0.05, def:1.6,  dec:2, tip:'Atracción hacia la mejor posición global' },
    ],
  },
  de: {
    name:  'DE — Evolución Diferencial',
    short: 'DE',
    primary: '#27ae60', rgb: '39,174,96',
    wiki: 'https://es.wikipedia.org/wiki/Evoluci%C3%B3n_diferencial',
    desc: 'DE usa mutación diferencial, crossover y selección. Genera candidatos usando diferencias entre individuos y conserva las mejores soluciones generación tras generación.',
    equations: ['mutante ← clip(x_r1 + F·(x_r2 − x_r3))', 'trial_d ← mutante_d  si  rand < CR  o  d = j_rand'],
    params: [
      { key:'F',  label:'F  (Factor diferencial)', min:0.1, max:2.0,  step:0.05, def:0.8,  dec:2, tip:'Escala la magnitud de la mutación' },
      { key:'CR', label:'CR (Crossover)',           min:0.0, max:1.0,  step:0.05, def:0.9,  dec:2, tip:'Probabilidad de heredar genes del mutante' },
    ],
  },
};

const BENCHMARKS_LIST = ['rastrigin','ackley','sphere','rosenbrock'];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────
const sleep = ms => new Promise(r => setTimeout(r, ms));

function toCSV(history, algo, benchmark) {
  const lines = [`# Algoritmo: ${algo.toUpperCase()}`, `# Benchmark: ${benchmark}`,
                 `# Iteraciones: ${history.length}`, 'iteracion,best_fitness'];
  history.forEach((v, i) => lines.push(`${i + 1},${v}`));
  return lines.join('\n');
}

function downloadCSV(history, algo, benchmark) {
  const blob = new Blob([toCSV(history, algo, benchmark)], { type: 'text/csv' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = `convergencia_${algo}_${benchmark}_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─────────────────────────────────────────────────────────────────────────────
// UI sub-components
// ─────────────────────────────────────────────────────────────────────────────
function Label({ children, tip, color }) {
  const [hov, sHov] = useState(false);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:5, marginTop:12 }}>
      <span style={{ color:'#cbd3e3', fontSize:13 }}>{children}</span>
      {tip && (
        <span onMouseEnter={()=>sHov(true)} onMouseLeave={()=>sHov(false)}
          style={{ position:'relative', width:14, height:14, borderRadius:'50%', cursor:'help',
            background:`rgba(${color},.18)`, border:`1px solid rgba(${color},.4)`,
            display:'flex', alignItems:'center', justifyContent:'center', fontSize:8, color:`rgb(${color})` }}>
          ?
          {hov && (
            <div style={{ position:'absolute', bottom:'130%', left:'50%', transform:'translateX(-50%)',
              background:'#0a1020', border:`1px solid rgba(${color},.4)`, borderRadius:6,
              padding:'6px 10px', fontSize:10, color:'#8aaac0', whiteSpace:'nowrap', zIndex:999,
              boxShadow:'0 4px 20px rgba(0,0,0,.85)', minWidth:180 }}>{tip}</div>
          )}
        </span>
      )}
    </div>
  );
}

function Input({ id, type='text', value, onChange, min, max, step, placeholder, disabled }) {
  return (
    <input id={id} type={type} value={value} onChange={e=>onChange(e.target.value)}
      min={min} max={max} step={step} placeholder={placeholder} disabled={disabled}
      style={{ width:'100%', padding:'8px 10px', borderRadius:8, border:'1px solid #394154',
        background:'#0a0f1c', color:'#f2f4f8', fontSize:13, fontFamily:'Oxanium,monospace',
        outline:'none', boxSizing:'border-box',
        opacity: disabled ? 0.45 : 1 }} />
  );
}

function Select({ value, onChange, options, disabled }) {
  return (
    <select value={value} onChange={e=>onChange(e.target.value)} disabled={disabled}
      style={{ width:'100%', padding:'8px 10px', borderRadius:8, border:'1px solid #394154',
        background:'#0a0f1c', color:'#f2f4f8', fontSize:13, fontFamily:'Oxanium,monospace',
        outline:'none', cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.45 : 1 }}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function SideBtn({ onClick, disabled, danger, children }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      width:'100%', marginTop:10, padding:'11px', border:'none', borderRadius:10,
      background: disabled ? '#1a2030'
                : danger   ? '#c44949'
                :             '#3a6ad4',
      color: disabled ? '#2a3a50' : '#fff',
      fontWeight:700, fontSize:14, cursor: disabled ? 'not-allowed' : 'pointer',
      fontFamily:'Oxanium,monospace', transition:'all .2s',
    }}
      onMouseEnter={e=>{ if(!disabled) e.currentTarget.style.background = danger ? '#db6060' : '#5580e8'; }}
      onMouseLeave={e=>{ if(!disabled) e.currentTarget.style.background = danger ? '#c44949' : '#3a6ad4'; }}>
      {children}
    </button>
  );
}

function Metric({ label, value, color }) {
  return (
    <div style={{ background:'#171b25', border:'1px solid #2a3040', borderRadius:14,
      padding:'14px 18px', minWidth:170 }}>
      <span style={{ display:'block', color:'#a8b0c2', fontSize:12 }}>{label}</span>
      <strong style={{ display:'block', marginTop:5, fontSize:18,
        color: color || '#f2f4f8', fontFamily:'monospace' }}>{value}</strong>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main SimulatorModal
// ─────────────────────────────────────────────────────────────────────────────
export default function SimulatorModal({ algo: initAlgo, onClose }) {
  // ── Algorithm selection ──
  const [algo, setAlgo] = useState(initAlgo);
  const meta = ALGO_META[algo];
  const { primary, rgb } = meta;

  // ── Config — mirrors Python app.py / index.html inputs ──
  const [benchmark,  setBenchmark]  = useState('rastrigin');
  const [dimensions, setDimensions] = useState('2');
  const [popSize,    setPopSize]    = useState('40');
  const [iterations, setIterations] = useState('150');
  const [low,        setLow]        = useState('-5.12');
  const [high,       setHigh]       = useState('5.12');
  const [seed,       setSeed]       = useState('');
  const [gridPoints, setGridPoints] = useState('100');
  const [delay,      setDelay]      = useState('0.03');
  const [emitEvery,  setEmitEvery]  = useState('1');
  const [logX,       setLogX]       = useState(false);
  const [logY,       setLogY]       = useState(false);

  // ── Per-algo params ──
  const initP = a => { const p={}; ALGO_META[a].params.forEach(pm=>{ p[pm.key]=String(pm.def); }); return p; };
  const [params, setParams] = useState(() => initP(initAlgo));
  const setParam = (k, v) => setParams(prev=>({...prev,[k]:v}));

  // When algorithm changes, reset params and preserve benchmark bounds
  const handleAlgoChange = (a) => {
    setAlgo(a);
    setParams(initP(a));
  };

  // Auto-fill bounds when benchmark changes
  const handleBenchmarkChange = (b) => {
    setBenchmark(b);
    const [l, h] = defaultBounds(b);
    setLow(String(l));
    setHigh(String(h));
  };

  // ── Run state ──
  const [running,   setRunning]   = useState(false);
  const [done,      setDone]      = useState(false);
  const [status,    setStatus]    = useState('Listo.');
  const [iterDisp,  setIterDisp]  = useState('---');
  const [bestDisp,  setBestDisp]  = useState('---');
  const [resultJSON, setResultJSON] = useState('{}');
  const [csvReady,  setCsvReady]  = useState(false);
  const [csvData,   setCsvData]   = useState(null);
  const [csvInfo,   setCsvInfo]   = useState({ algo:'', bench:'' });
  const stopRef    = useRef(false);
  const historyRef = useRef([]);

  // ── Plotly refs ──
  const surfaceRef  = useRef(null);
  const convergRef  = useRef(null);
  const plotsReady  = useRef({ s: false, c: false });

  // Block scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // ── Init surface plot — matches initializeSurfacePlot() in app.js ──
  const initSurface = useCallback((surface, title) => {
    const P = window.Plotly;
    if (!P || !surfaceRef.current) return;
    P.newPlot(surfaceRef.current, [
      { x: surface.x, y: surface.y, z: surface.z, type:'contour',
        colorscale:'Viridis', contours:{ coloring:'heatmap' },
        showscale:true, name:'Función' },
      { x:[], y:[], mode:'markers', type:'scatter', name:'Población',
        marker:{ size:8, color:'white', line:{ color:'black', width:1 } } },
      { x:[], y:[], mode:'markers', type:'scatter', name:'Mejor',
        marker:{ size:18, color:'red', symbol:'star' } },
    ], {
      title: { text: title, font:{ color:'#f2f4f8', size:13 } },
      paper_bgcolor:'#171b25', plot_bgcolor:'#171b25',
      font:{ color:'#f2f4f8' },
      xaxis:{ title:'x1', gridcolor:'#2a3040', zerolinecolor:'#394154' },
      yaxis:{ title:'x2', gridcolor:'#2a3040', zerolinecolor:'#394154' },
      margin:{ t:40, r:15, b:40, l:45 },
      legend:{ font:{ color:'#a8b0c2', size:10 }, bgcolor:'rgba(23,27,37,.8)' },
    }, { responsive:true, displayModeBar:false });
    plotsReady.current.s = true;
  }, []);

  // ── Init convergence plot — matches initializeConvergencePlot() in app.js ──
  const initConverg = useCallback(() => {
    const P = window.Plotly;
    if (!P || !convergRef.current) return;
    P.newPlot(convergRef.current, [
      { x:[], y:[], type:'scatter', mode:'lines',
        line:{ width:3, color: primary }, name:'Best fitness' },
    ], {
      paper_bgcolor:'#171b25', plot_bgcolor:'#171b25',
      font:{ color:'#f2f4f8' },
      xaxis:{ title:'Iteración', type: logX ? 'log':'linear',
              gridcolor:'#2a3040', zerolinecolor:'#394154' },
      yaxis:{ title:'Mejor fitness', type: logY ? 'log':'linear',
              autorange:true, gridcolor:'#2a3040', zerolinecolor:'#394154' },
      margin:{ t:20, r:15, b:40, l:58 },
    }, { responsive:true, displayModeBar:false });
    plotsReady.current.c = true;
  }, [primary, logX, logY]);

  // ── Update plots — matches updateIterationPlot() in app.js ──
  const updatePlots = useCallback((positions, bestPos, history) => {
    const P = window.Plotly;
    if (!P) return;
    const dim = positions[0]?.length ?? 2;
    if (plotsReady.current.s && surfaceRef.current && dim >= 2) {
      P.restyle(surfaceRef.current, { x:[positions.map(p=>p[0])], y:[positions.map(p=>p[1])] }, [1]);
      P.restyle(surfaceRef.current, { x:[[bestPos[0]]], y:[[bestPos[1]]] }, [2]);
    }
    if (plotsReady.current.c && convergRef.current) {
      const xh = history.map((_,i)=>i+1);
      const yh = logY ? history.map(v=>Math.max(v,1e-12)) : history;
      P.restyle(convergRef.current, { x:[xh], y:[yh] }, [0]);
      P.relayout(convergRef.current, { 'yaxis.autorange':true, 'xaxis.autorange':true });
    }
  }, [logY]);

  // ── VALIDATE ──
  const validate = () => {
    const lo = parseFloat(low), hi = parseFloat(high);
    const dim = parseInt(dimensions);
    if (hi <= lo) return 'El límite superior debe ser mayor al inferior.';
    if (dim < 2)  return 'Dimensiones mínimas: 2.';
    if (dim !== 2) return 'La visualización dinámica requiere dimensions = 2.';
    return null;
  };

  // ── RUN — mirrors run_background() in app.py ──
  const run = useCallback(async () => {
    if (running) return;
    const err = validate();
    if (err) { alert(err); return; }

    stopRef.current = false;
    plotsReady.current = { s:false, c:false };
    historyRef.current = [];
    setRunning(true); setDone(false); setCsvReady(false);
    setIterDisp('---'); setBestDisp('---'); setResultJSON('{}');
    setStatus('Iniciando...');

    if (surfaceRef.current && window.Plotly) window.Plotly.purge(surfaceRef.current);
    if (convergRef.current && window.Plotly) window.Plotly.purge(convergRef.current);

    await sleep(60);

    try {
      const func   = getBenchmark(benchmark);
      const bounds = [parseFloat(low), parseFloat(high)];
      const dim    = parseInt(dimensions);
      const pop    = parseInt(popSize);
      const iters  = parseInt(iterations);
      const gpts   = parseInt(gridPoints);
      const delayMs= Math.round(parseFloat(delay) * 1000);
      const every  = Math.max(1, parseInt(emitEvery));
      const seedVal= seed.trim() === '' ? null : parseInt(seed);

      const algoParams = {};
      meta.params.forEach(pm => { algoParams[pm.key] = parseFloat(params[pm.key] ?? pm.def); });

      const cfg = { func, dim, bounds, popSize: pop, iterations: iters, seed: seedVal, ...algoParams };
      const opt = algo === 'pso' ? new PSO(cfg) : new DifferentialEvolution(cfg);

      // Emit surface — matches socketio.emit("surface", ...) in app.py
      const surface = makeSurface(func, bounds, gpts);
      initSurface(surface, `${algo.toUpperCase()} sobre ${benchmark}`);
      initConverg();

      setStatus(`Ejecutando iteración 1/${iters}`);

      // Main loop — mirrors run_background for loop
      while (!opt.isDone() && !stopRef.current) {
        opt.step();
        const { position: bestPos, score: bestScore } = opt.getBest();
        const positions = opt.getPositions();
        historyRef.current = opt.history;

        // emit_every logic — matches Python emit_every check
        if ((opt.iteration % every === 0) || opt.iteration === iters) {
          setIterDisp(`${opt.iteration}/${iters}`);
          setBestDisp(bestScore.toExponential(4));
          setStatus(`Ejecutando iteración ${opt.iteration}/${iters}`);
          updatePlots(positions, bestPos, opt.history);
        }

        if (delayMs > 0) await sleep(delayMs);
      }

      // Finished — mirrors socketio.emit("finished", ...) in app.py
      const { position: finalPos, score: finalScore } = opt.getBest();
      const stopped = stopRef.current;

      setStatus(stopped ? 'Corrida detenida.' : 'Optimización terminada.');
      setIterDisp(`${opt.iteration}/${iters}`);
      setBestDisp(finalScore.toExponential(4));

      const result = {
        stopped,
        best_position: finalPos.map(v => parseFloat(v.toFixed(6))),
        best_score:    parseFloat(finalScore.toExponential(8)),
        iterations:    opt.history.length,
        algorithm:     algo.toUpperCase(),
        benchmark,
        parameters:    algoParams,
      };
      setResultJSON(JSON.stringify(result, null, 2));
      setCsvData(opt.history);
      setCsvInfo({ algo, bench: benchmark });
      setCsvReady(true);
      setDone(true);

    } catch (e) {
      setStatus(`Error: ${e.message}`);
      console.error(e);
    } finally {
      setRunning(false);
    }
  }, [running, algo, benchmark, dimensions, popSize, iterations, low, high,
      seed, gridPoints, delay, emitEvery, logX, logY, params,
      meta, initSurface, initConverg, updatePlots]);

  const stop = () => { stopRef.current = true; setStatus('Solicitud de detener enviada...'); };

  const progress = (() => {
    const it = parseInt(iterDisp.split('/')[0]);
    const tot = parseInt(iterDisp.split('/')[1]);
    return (!isNaN(it) && !isNaN(tot) && tot > 0) ? (it / tot) * 100 : 0;
  })();

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}
      style={{ position:'fixed', inset:0, zIndex:500, background:'rgba(5,8,18,.92)',
        backdropFilter:'blur(10px)', display:'flex', alignItems:'flex-start',
        justifyContent:'center', overflowY:'auto', padding:'14px 10px 40px',
        fontFamily:'Oxanium, Arial, monospace' }}>

      <div style={{ width:'100%', maxWidth:1160, background:'#10131a',
        border:`1.5px solid rgba(${rgb},.32)`, borderRadius:16, overflow:'hidden',
        boxShadow:`0 0 80px rgba(${rgb},.14), 0 30px 70px rgba(0,0,0,.9)` }}>

        {/* ── Header bar ── */}
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
          padding:'14px 22px',
          background:`linear-gradient(90deg,rgba(${rgb},.18),rgba(${rgb},.04))`,
          borderBottom:`1px solid rgba(${rgb},.2)` }}>
          <div>
            <div style={{ color:primary, fontSize:9, letterSpacing:4, fontWeight:700, marginBottom:4 }}>
              ⚡ EAPACK v7.0 — SIMULADOR EN TIEMPO REAL
            </div>
            <h2 style={{ color:'#f2f4f8', fontSize:18, fontWeight:700, margin:0 }}>
              {meta.name}
            </h2>
          </div>
          <div style={{ display:'flex', gap:8 }}>
            <button onClick={()=>window.open(meta.wiki,'_blank')} style={{
              background:`rgba(${rgb},.12)`, border:`1px solid rgba(${rgb},.38)`,
              borderRadius:7, color:primary, padding:'6px 14px', fontSize:11,
              cursor:'pointer', fontFamily:'Oxanium,monospace', letterSpacing:1.5, fontWeight:600 }}>
              ↗ WIKI
            </button>
            <button onClick={onClose} style={{
              background:'rgba(196,73,73,.12)', border:'1px solid rgba(196,73,73,.4)',
              borderRadius:7, color:'#db6060', width:34, height:34, fontSize:16,
              cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center' }}>✕</button>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ display:'flex', minHeight:620 }}>

          {/* ══════ SIDEBAR ══════ */}
          <aside style={{ width:310, flexShrink:0, background:'#171b25',
            borderRight:'1px solid #2a3040', padding:'18px 18px 24px', overflowY:'auto' }}>

            <h3 style={{ margin:'0 0 4px', fontSize:20, color:'#f2f4f8' }}>EAPack v7.0</h3>
            <p style={{ color:'#a8b0c2', margin:'0 0 16px', fontSize:12 }}>
              HTML RealTime · Migrado a React
            </p>

            {/* Algorithm */}
            <Label color={rgb}>Algoritmo</Label>
            <Select value={algo} onChange={handleAlgoChange} disabled={running}
              options={[{value:'pso',label:'PSO'},{value:'de',label:'Differential Evolution'}]}/>

            {/* Description block — matches #algorithm-description in Python */}
            <div style={{ marginTop:10, padding:11, borderRadius:10,
              background:'#212738', color:'#d9e2f2', lineHeight:1.55, fontSize:12.5 }}>
              {meta.desc}
            </div>

            {/* Equations */}
            <div style={{ marginTop:10, padding:'8px 11px', borderRadius:8,
              background:'rgba(4,10,22,.8)', border:`1px solid rgba(${rgb},.15)` }}>
              {meta.equations.map((eq,i)=>(
                <div key={i} style={{ color:'#79c0ef', fontSize:11, fontFamily:'monospace',
                  padding:'2px 0', borderBottom: i<meta.equations.length-1 ? '1px solid rgba(255,255,255,.05)':'none' }}>
                  {eq}
                </div>
              ))}
            </div>

            {/* Benchmark */}
            <Label color={rgb}>Benchmark</Label>
            <Select value={benchmark} onChange={handleBenchmarkChange} disabled={running}
              options={Object.entries(BENCHMARK_META).map(([k,v])=>({value:k,label:k}))}/>
            {BENCHMARK_META[benchmark] && (
              <div style={{ color:'#394154', fontSize:10, marginTop:4 }}>
                {BENCHMARK_META[benchmark].note} · Óptimo: {BENCHMARK_META[benchmark].optima}
              </div>
            )}

            {/* Dimensions + Population */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:2 }}>
              <div>
                <Label color={rgb}>Dimensiones</Label>
                <Input type="number" value={dimensions} onChange={setDimensions}
                  min="2" disabled={running}/>
              </div>
              <div>
                <Label color={rgb}>Población</Label>
                <Input type="number" value={popSize} onChange={setPopSize}
                  min="4" disabled={running}/>
              </div>
            </div>

            <Label color={rgb}>Iteraciones</Label>
            <Input type="number" value={iterations} onChange={setIterations} min="1" disabled={running}/>

            {/* Bounds */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:2 }}>
              <div>
                <Label color={rgb}>Límite inferior</Label>
                <Input type="number" value={low} onChange={setLow} step="0.01" disabled={running}/>
              </div>
              <div>
                <Label color={rgb}>Límite superior</Label>
                <Input type="number" value={high} onChange={setHigh} step="0.01" disabled={running}/>
              </div>
            </div>

            <Label color={rgb}>Semilla (vacío = aleatorio)</Label>
            <Input value={seed} onChange={setSeed} placeholder="vacío = aleatorio" disabled={running}/>

            {/* Algo-specific params */}
            <div style={{ marginTop:14, paddingTop:12, borderTop:'1px solid #2a3040' }}>
              <div style={{ color:primary, fontSize:10, letterSpacing:2, fontWeight:700, marginBottom:4 }}>
                PARÁMETROS {meta.short}
              </div>
              <div style={{ display:'grid', gridTemplateColumns: meta.params.length===3 ? '1fr 1fr 1fr':'1fr 1fr', gap:8 }}>
                {meta.params.map(pm=>(
                  <div key={pm.key}>
                    <Label color={rgb} tip={pm.tip}>{pm.key}</Label>
                    <Input type="number" value={params[pm.key]??pm.def}
                      onChange={v=>setParam(pm.key,v)} min={pm.min} max={pm.max} step={pm.step} disabled={running}/>
                  </div>
                ))}
              </div>
            </div>

            {/* Visualization params */}
            <div style={{ marginTop:14, paddingTop:12, borderTop:'1px solid #2a3040' }}>
              <div style={{ color:'#607590', fontSize:10, letterSpacing:2, fontWeight:700, marginBottom:4 }}>
                VISUALIZACIÓN DINÁMICA
              </div>

              <Label color={rgb}>Puntos de malla</Label>
              <Input type="number" value={gridPoints} onChange={setGridPoints} min="30" max="250" disabled={running}/>

              <Label color={rgb}>Retardo por iteración (seg)</Label>
              <Input type="number" value={delay} onChange={setDelay} min="0" step="0.01" disabled={running}/>

              <Label color={rgb}>Emitir cada N iteraciones</Label>
              <Input type="number" value={emitEvery} onChange={setEmitEvery} min="1" disabled={running}/>

              <div style={{ display:'flex', gap:16, marginTop:12 }}>
                <label style={{ display:'flex', alignItems:'center', gap:6, color:'#cbd3e3', fontSize:13, cursor:'pointer' }}>
                  <input type="checkbox" checked={logX} onChange={e=>setLogX(e.target.checked)}
                    style={{ accentColor:primary }}/>
                  Eje X log
                </label>
                <label style={{ display:'flex', alignItems:'center', gap:6, color:'#cbd3e3', fontSize:13, cursor:'pointer' }}>
                  <input type="checkbox" checked={logY} onChange={e=>setLogY(e.target.checked)}
                    style={{ accentColor:primary }}/>
                  Eje Y log
                </label>
              </div>
            </div>

            {/* Action buttons */}
            <SideBtn onClick={run} disabled={running}>
              {running ? '⏳ Ejecutando...' : '▶  Ejecutar en tiempo real'}
            </SideBtn>
            <SideBtn onClick={stop} disabled={!running} danger>
              ⏹  Detener
            </SideBtn>

            {csvReady && (
              <button onClick={()=>downloadCSV(csvData, csvInfo.algo, csvInfo.bench)}
                style={{ display:'block', textAlign:'center', marginTop:12, padding:'11px',
                  background:'#1f8f5f', color:'#fff', textDecoration:'none',
                  borderRadius:10, fontWeight:700, border:'none', cursor:'pointer',
                  width:'100%', fontFamily:'Oxanium,monospace', fontSize:13 }}>
                ⬇ Descargar CSV
              </button>
            )}
          </aside>

          {/* ══════ MAIN ══════ */}
          <main style={{ flex:1, padding:'22px', overflowY:'auto', background:'#10131a' }}>

            {/* Topbar — matches .topbar in Python */}
            <div style={{ display:'flex', gap:16, alignItems:'flex-start', marginBottom:20, flexWrap:'wrap' }}>
              <div style={{ flex:1 }}>
                <h2 style={{ margin:'0 0 4px', color:'#f2f4f8', fontSize:18 }}>Dashboard dinámico</h2>
                <p style={{ margin:0, color:'#a8b0c2', fontSize:13 }}>{status}</p>
                {/* Progress bar */}
                {running && (
                  <div style={{ marginTop:8, height:3, background:'rgba(255,255,255,.06)', borderRadius:2, overflow:'hidden', width:280 }}>
                    <div style={{ height:'100%', width:`${progress}%`, borderRadius:2,
                      background:`linear-gradient(90deg,rgba(${rgb},.6),rgb(${rgb}))`,
                      transition:'width .15s', boxShadow:`0 0 8px rgba(${rgb},.5)` }}/>
                  </div>
                )}
              </div>
              <Metric label="Iteración"    value={iterDisp} />
              <Metric label="Mejor fitness" value={bestDisp} color={primary} />
            </div>

            {/* Plots grid — matches .results in Python */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
              <div style={{ background:'#171b25', border:'1px solid #2a3040', borderRadius:16, padding:'16px' }}>
                <h3 style={{ margin:'0 0 10px', color:'#f2f4f8', fontSize:14 }}>
                  Función benchmark y población dinámica
                </h3>
                <div ref={surfaceRef} style={{ height:440 }}>
                  {!running && !done && (
                    <div style={{ height:'100%', display:'flex', alignItems:'center',
                      justifyContent:'center', flexDirection:'column', gap:8 }}>
                      <div style={{ fontSize:40, opacity:.12 }}>◎</div>
                      <div style={{ color:'#2a3a50', fontSize:12 }}>Presiona Ejecutar</div>
                    </div>
                  )}
                </div>
              </div>

              <div style={{ background:'#171b25', border:'1px solid #2a3040', borderRadius:16, padding:'16px' }}>
                <h3 style={{ margin:'0 0 10px', color:'#f2f4f8', fontSize:14 }}>
                  Convergencia dinámica
                </h3>
                <div ref={convergRef} style={{ height:440 }}>
                  {!running && !done && (
                    <div style={{ height:'100%', display:'flex', alignItems:'center',
                      justifyContent:'center', flexDirection:'column', gap:8 }}>
                      <div style={{ fontSize:34, opacity:.12 }}>〰</div>
                      <div style={{ color:'#2a3a50', fontSize:12 }}>La curva aparecerá aquí</div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Result JSON — matches #result-json in Python */}
            <div style={{ background:'#171b25', border:'1px solid #2a3040', borderRadius:16, padding:'18px' }}>
              <h3 style={{ margin:'0 0 10px', color:'#f2f4f8', fontSize:14 }}>Resultado</h3>
              <pre style={{ background:'#0a0f1c', borderRadius:10, padding:'14px',
                overflowX:'auto', color:'#8aaac0', fontSize:12, margin:0,
                fontFamily:'monospace', lineHeight:1.6 }}>
                {resultJSON}
              </pre>
            </div>

          </main>
        </div>

        {/* Footer */}
        <div style={{ padding:'8px 22px', borderTop:'1px solid #1a2030',
          background:'rgba(10,13,22,.8)', display:'flex', justifyContent:'space-between' }}>
          <span style={{ color:'#1e3050', fontSize:9, letterSpacing:2 }}>
            INSTITUTO POLITÉCNICO NACIONAL · CENTRO DE INVESTIGACIÓN EN COMPUTACIÓN
          </span>
          <span style={{ color:'#1e3050', fontSize:9 }}>EAPack v7.0 → React Migration</span>
        </div>
      </div>
    </div>
  );
}

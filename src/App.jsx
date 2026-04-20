import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════
// TREE DATA
// ═══════════════════════════════════════════════════════
const TREE = {
  id: "root",
  label: "Algoritmos de\nOptimización",
  url: "https://es.wikipedia.org/wiki/Optimizaci%C3%B3n_(matem%C3%A1tica)",
  desc: "Campo de las matemáticas que busca encontrar la mejor solución entre un conjunto de alternativas posibles.",
  children: [
    {
      id: "deterministas",
      label: "Algoritmos\nDeterministas",
      url: "https://es.wikipedia.org/wiki/Algoritmo_determinista",
      desc: "Producen el mismo resultado dado el mismo punto de inicio. Sin aleatoriedad en el proceso.",
      children: [
        {
          id: "directa",
          label: "Búsqueda\nDirecta",
          url: "https://en.wikipedia.org/wiki/Direct_search_algorithm",
          desc: "No utilizan derivadas para encontrar el mínimo. Evalúan la función directamente en distintos puntos.",
          children: [
            { id: "colina", label: "Escalador\nde Colina", url: "https://es.wikipedia.org/wiki/Escalada_(inform%C3%A1tica)", desc: "Algoritmo iterativo que avanza hacia soluciones vecinas de mayor valor (o menor costo). Simple pero susceptible a mínimos locales.", children: [] },
            { id: "nelder", label: "Nelder-Mead", url: "https://es.wikipedia.org/wiki/M%C3%A9todo_de_Nelder-Mead", desc: "Método simplex que no requiere derivadas. Muy popular en optimización de parámetros experimentales.", children: [] },
          ]
        },
        {
          id: "indirecta",
          label: "Búsqueda\nIndirecta",
          url: "https://en.wikipedia.org/wiki/Gradient_descent",
          desc: "Utilizan derivadas o gradientes para guiar la búsqueda hacia el óptimo.",
          children: [
            { id: "newton", label: "Método\nde Newton", url: "https://es.wikipedia.org/wiki/M%C3%A9todo_de_Newton", desc: "Usa la segunda derivada (Hessiana) para convergencia rápida. Muy eficiente cerca del óptimo.", children: [] },
            { id: "gradiente", label: "Gradiente\nDescendente", url: "https://es.wikipedia.org/wiki/Descenso_de_gradiente", desc: "Sigue la dirección de mayor descenso. Base del entrenamiento de redes neuronales modernas.", children: [] },
          ]
        }
      ]
    },
    {
      id: "estocasticos",
      label: "Algoritmos\nEstocásticos",
      url: "https://es.wikipedia.org/wiki/Algoritmo_estoc%C3%A1stico",
      desc: "Incorporan aleatoriedad. Pueden producir diferentes resultados en cada ejecución, incluso con las mismas condiciones iniciales.",
      children: [
        {
          id: "metaheuristicos",
          label: "Algoritmos\nMetaheurísticos",
          url: "https://es.wikipedia.org/wiki/Metaheur%C3%ADstica",
          desc: "Estrategias de alto nivel que guían la búsqueda heurística. Inspirados frecuentemente en fenómenos naturales.",
          children: [
            {
              id: "poblacion",
              label: "Basados en\nPoblación",
              url: "https://en.wikipedia.org/wiki/Evolutionary_algorithm",
              desc: "Trabajan con múltiples soluciones simultáneas, favoreciendo la diversidad de exploración.",
              children: [
                {
                  id: "evolutivos",
                  label: "Algoritmos\nEvolutivos",
                  url: "https://es.wikipedia.org/wiki/Algoritmo_evolutivo",
                  desc: "Simulan el proceso de evolución biológica mediante selección, cruce y mutación de soluciones.",
                  children: [
                    { id: "geneticos", label: "Algoritmos\nGenéticos", url: "https://es.wikipedia.org/wiki/Algoritmo_gen%C3%A9tico", desc: "Operan sobre cromosomas codificados usando selección natural, cruce y mutación para evolucionar soluciones óptimas.", children: [] },
                    { id: "diferencial", label: "Evolución\nDiferencial", url: "https://es.wikipedia.org/wiki/Evoluci%C3%B3n_diferencial", desc: "Perturba vectores de solución sumando diferencias ponderadas entre miembros de la población. Muy robusto en espacios continuos.", children: [] },
                    { id: "prog-gen", label: "Programación\nGenética", url: "https://es.wikipedia.org/wiki/Programaci%C3%B3n_gen%C3%A9tica", desc: "Evoluciona programas o expresiones matemáticas representadas como árboles. Utilizada en diseño automático de modelos.", children: [] },
                  ]
                },
                {
                  id: "colectiva",
                  label: "Inteligencia\nColectiva",
                  url: "https://es.wikipedia.org/wiki/Inteligencia_de_enjambre",
                  desc: "Basados en el comportamiento colectivo emergente de agentes simples interactuando localmente.",
                  children: [
                    { id: "pso", label: "Enjambre de\nPartículas (PSO)", url: "https://es.wikipedia.org/wiki/Optimizaci%C3%B3n_por_enjambre_de_part%C3%ADculas", desc: "Partículas exploran el espacio influenciadas por su mejor posición histórica y la del vecindario. Muy usado en ingeniería.", children: [] },
                    { id: "abc", label: "Colonia\nde Abejas", url: "https://en.wikipedia.org/wiki/Artificial_bee_colony_algorithm", desc: "Imita el comportamiento de abejas buscando alimento. Abejas exploradoras, empleadas y observadoras cooperan para hallar óptimos.", children: [] },
                    { id: "aco", label: "Colonia\nde Hormigas", url: "https://es.wikipedia.org/wiki/Algoritmo_de_colonia_de_hormigas", desc: "Simula el depósito de feromonas de hormigas. Excelente para problemas combinatorios como el Viajante de Comercio (TSP).", children: [] },
                  ]
                }
              ]
            },
            {
              id: "trayectoria",
              label: "Basados en\nTrayectoria",
              url: "https://en.wikipedia.org/wiki/Simulated_annealing",
              desc: "Parten de una única solución y la mejoran iterativamente siguiendo una trayectoria en el espacio de búsqueda.",
              children: [
                { id: "caminata", label: "Caminata\nAleatoria", url: "https://es.wikipedia.org/wiki/Camino_aleatorio", desc: "Exploración mediante pasos aleatorios sucesivos. Base teórica para muchos algoritmos más sofisticados.", children: [] },
                { id: "recocido", label: "Recocido\nSimulado", url: "https://es.wikipedia.org/wiki/Recocido_simulado", desc: "Acepta soluciones peores con probabilidad decreciente (temperatura). Puede escapar de mínimos locales.", children: [] },
                { id: "tabu", label: "Búsqueda\nTabú", url: "https://es.wikipedia.org/wiki/B%C3%BAsqueda_tab%C3%BA", desc: "Usa memoria a corto plazo (lista tabú) para prohibir movimientos recientes y evitar ciclos en la búsqueda.", children: [] },
              ]
            }
          ]
        },
        {
          id: "heuristicos",
          label: "Algoritmos\nHeurísticos",
          url: "https://es.wikipedia.org/wiki/Heur%C3%ADstica_(inform%C3%A1tica)",
          desc: "Técnicas de resolución de problemas basadas en reglas prácticas y experiencia. No garantizan la solución óptima pero son eficientes.",
          children: []
        }
      ]
    }
  ]
};

// ═══════════════════════════════════════════════════════
// DEPTH COLOR SYSTEM
// ═══════════════════════════════════════════════════════
const DC = [
  { bg: 'linear-gradient(145deg,#3b0909,#6e1515)', border: '#e74c3c', glow: '#e74c3c', text: '#ff9090', rgb: '231,76,60' },
  { bg: 'linear-gradient(145deg,#081d3a,#0d2e5e)', border: '#2980b9', glow: '#2980b9', text: '#79c0ef', rgb: '41,128,185' },
  { bg: 'linear-gradient(145deg,#07253a,#0a3656)', border: '#00b4d8', glow: '#00b4d8', text: '#70daf8', rgb: '0,180,216' },
  { bg: 'linear-gradient(145deg,#160e3d,#231552)', border: '#9b59b6', glow: '#9b59b6', text: '#c498e8', rgb: '155,89,182' },
  { bg: 'linear-gradient(145deg,#092918,#0d3f23)', border: '#27ae60', glow: '#27ae60', text: '#6fdb96', rgb: '39,174,96' },
  { bg: 'linear-gradient(145deg,#291d07,#3e2c09)', border: '#f39c12', glow: '#f39c12', text: '#f9c545', rgb: '243,156,18' },
];

function dc(depth) { return DC[Math.min(depth, DC.length - 1)]; }

// ═══════════════════════════════════════════════════════
// TOOLTIP
// ═══════════════════════════════════════════════════════
function Tooltip({ text, color }) {
  return (
    <div style={{
      position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%',
      transform: 'translateX(-50%)', zIndex: 100, width: 220, pointerEvents: 'none',
      background: '#050c18', border: `1px solid ${color}44`,
      borderRadius: 8, padding: '10px 12px', fontSize: 11, lineHeight: 1.6,
      color: '#a0b8d0', boxShadow: `0 0 20px ${color}30, 0 8px 30px rgba(0,0,0,0.8)`,
      animation: 'tooltipIn 0.15s ease',
    }}>
      <div style={{ borderBottom: `1px solid ${color}30`, marginBottom: 6, paddingBottom: 6,
        color, fontSize: 10, letterSpacing: 1, fontWeight: 600 }}>
        INFO
      </div>
      {text}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// NODE BOX
// ═══════════════════════════════════════════════════════
function NodeBox({ node, depth, nodeRef, onToggle, isLeaf, isExpanded, sibIdx }) {
  const { bg, border, glow, text, rgb } = dc(depth);
  const [hovered, setHovered] = useState(false);
  const delay = depth * 100 + sibIdx * 70;

  return (
    <div style={{ position: 'relative', flexShrink: 0 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Glow pulse ring */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: -4, borderRadius: 14,
          border: `1px solid ${glow}`, animation: 'ringPulse 1s ease infinite',
          pointerEvents: 'none',
        }} />
      )}

      <div
        ref={nodeRef}
        onClick={() => isLeaf ? window.open(node.url, '_blank') : onToggle(node.id)}
        style={{
          position: 'relative', background: bg, border: `1.5px solid ${hovered ? '#ffffff66' : border}`,
          borderRadius: 10, padding: depth === 0 ? '12px 20px' : '9px 14px',
          minWidth: depth === 0 ? 155 : 118, maxWidth: depth === 0 ? 165 : 145,
          cursor: 'pointer', color: '#fff', textAlign: 'center',
          transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
          boxShadow: hovered
            ? `0 0 32px rgba(${rgb},0.5), 0 0 12px rgba(${rgb},0.3), inset 0 1px 0 rgba(255,255,255,0.18)`
            : `0 0 14px rgba(${rgb},0.18), inset 0 1px 0 rgba(255,255,255,0.06)`,
          transform: hovered ? 'translateY(-2px) scale(1.04)' : 'none',
          userSelect: 'none', zIndex: 2,
          animation: `nodeIn 0.5s cubic-bezier(0.34,1.4,0.64,1) ${delay}ms both`,
        }}
      >
        {/* Shine line */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)`,
          borderRadius: 1,
        }} />

        {/* Main label */}
        <div style={{
          fontSize: depth === 0 ? 13.5 : 11, fontWeight: depth === 0 ? 700 : 500,
          lineHeight: 1.4, whiteSpace: 'pre-line', color: '#ecf0f1', letterSpacing: 0.3,
        }}>
          {node.label}
        </div>

        {/* Action label */}
        <div style={{ color: text, fontSize: 8.5, marginTop: 5, letterSpacing: 1.5, fontWeight: 600, opacity: 0.85 }}>
          {isLeaf ? '↗ WIKIPEDIA' : isExpanded ? '▾ COLAPSAR' : '▸ EXPANDIR'}
        </div>
      </div>

      {/* Tooltip */}
      {hovered && node.desc && <Tooltip text={node.desc} color={glow} />}

      {/* Wiki link button for branch nodes */}
      {!isLeaf && (
        <div
          onClick={e => { e.stopPropagation(); window.open(node.url, '_blank'); }}
          title="Abrir en Wikipedia"
          style={{
            position: 'absolute', top: 5, right: 5, width: 17, height: 17,
            background: `rgba(${rgb},0.15)`, border: `1px solid rgba(${rgb},0.5)`,
            borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 8, color: text, cursor: 'pointer', transition: 'all 0.2s', zIndex: 3,
          }}
          onMouseEnter={e => e.currentTarget.style.background = `rgba(${rgb},0.4)`}
          onMouseLeave={e => e.currentTarget.style.background = `rgba(${rgb},0.15)`}
        >↗</div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TREE NODE
// ═══════════════════════════════════════════════════════
function TreeNode({ node, depth = 0, nodeRefs, onToggle, expanded, sibIdx = 0 }) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded[node.id] !== false;
  const isLeaf = !hasChildren;
  const setRef = useCallback(el => { if (el) nodeRefs.current[node.id] = el; }, [node.id, nodeRefs]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <NodeBox
        node={node} depth={depth} nodeRef={setRef}
        onToggle={onToggle} isLeaf={isLeaf} isExpanded={isExpanded} sibIdx={sibIdx}
      />

      {hasChildren && isExpanded && (
        <div style={{
          marginLeft: 46, display: 'flex', flexDirection: 'column', gap: 14,
          animation: 'fadeIn 0.3s ease',
        }}>
          {node.children.map((child, i) => (
            <TreeNode
              key={child.id} node={child} depth={depth + 1}
              nodeRefs={nodeRefs} onToggle={onToggle} expanded={expanded} sibIdx={i}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SVG CONNECTOR LINES
// ═══════════════════════════════════════════════════════
function ConnectorLines({ nodeRefs, expanded, containerRef }) {
  const [paths, setPaths] = useState([]);
  const [svgSize, setSvgSize] = useState({ w: 800, h: 600 });

  const compute = useCallback(() => {
    if (!containerRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const scrollTop = containerRef.current.scrollTop || 0;
    const scrollLeft = containerRef.current.scrollLeft || 0;
    const newPaths = [];

    function walk(node, depth) {
      if (!node.children || expanded[node.id] === false || node.children.length === 0) return;
      const pe = nodeRefs.current[node.id];
      if (!pe) return;
      const pr = pe.getBoundingClientRect();

      node.children.forEach(child => {
        const ce = nodeRefs.current[child.id];
        if (!ce) return;
        const ch = ce.getBoundingClientRect();
        const x1 = pr.right - cr.left;
        const y1 = pr.top + pr.height / 2 - cr.top;
        const x2 = ch.left - cr.left;
        const y2 = ch.top + ch.height / 2 - cr.top;
        const mx = (x1 + x2) / 2;
        newPaths.push({
          id: `${node.id}→${child.id}`,
          d: `M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`,
          color: dc(depth).border, glow: dc(depth).glow, rgb: dc(depth).rgb,
        });
        walk(child, depth + 1);
      });
    }

    walk(TREE, 0);
    setPaths(newPaths);
    setSvgSize({
      w: Math.max(cr.width, containerRef.current.scrollWidth),
      h: Math.max(cr.height, containerRef.current.scrollHeight),
    });
  }, [nodeRefs, expanded, containerRef]);

  useEffect(() => {
    const t = setTimeout(compute, 80);
    return () => clearTimeout(t);
  }, [compute]);

  useEffect(() => {
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [compute]);

  return (
    <svg style={{
      position: 'absolute', top: 0, left: 0, width: svgSize.w, height: svgSize.h,
      pointerEvents: 'none', overflow: 'visible', zIndex: 0,
    }}>
      <defs>
        <filter id="lGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {paths.map(p => (
        <g key={p.id}>
          <path d={p.d} fill="none" stroke={p.glow} strokeWidth="5" strokeOpacity="0.12" />
          <path d={p.d} fill="none" stroke={p.color} strokeWidth="1.5" strokeOpacity="0.7" filter="url(#lGlow)" />
          <path d={p.d} fill="none" stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.08" />
        </g>
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
// FLOATING PARTICLES BACKGROUND
// ═══════════════════════════════════════════════════════
function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    dur: Math.random() * 15 + 10,
    delay: Math.random() * 10,
    color: DC[Math.floor(Math.random() * DC.length)].glow,
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: '50%', background: p.color,
          opacity: 0.4,
          animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
          boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// LEGEND
// ═══════════════════════════════════════════════════════
function Legend() {
  const levels = ['Raíz', 'Categoría', 'Subcategoría', 'Familia', 'Método', 'Variante'];
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 50,
      background: 'rgba(4,8,18,0.92)', border: '1px solid #0d1e38',
      borderRadius: 12, padding: '14px 18px', backdropFilter: 'blur(10px)',
    }}>
      <div style={{ color: '#3d5a80', fontSize: 9, letterSpacing: 2, marginBottom: 10, fontWeight: 600 }}>
        PROFUNDIDAD
      </div>
      {DC.slice(0, 6).map((c, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
          <div style={{ width: 24, height: 3, borderRadius: 2, background: c.glow, boxShadow: `0 0 6px ${c.glow}` }} />
          <span style={{ color: c.text, fontSize: 10, fontWeight: 500 }}>{levels[i]}</span>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [expanded, setExpanded] = useState({});
  const nodeRefs = useRef({});
  const containerRef = useRef(null);

  const toggle = useCallback((id) => {
    setExpanded(prev => ({ ...prev, [id]: prev[id] === false }));
  }, []);

  return (
    <div style={{
      width: '100%', minHeight: '100vh', background: '#040810',
      fontFamily: "'Oxanium', 'Share Tech Mono', monospace",
      position: 'relative', overflowX: 'hidden',
      margin: 0, padding: 0,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root {
          width: 100%; min-height: 100vh;
          margin: 0; padding: 0;
          background: #040810;
          overflow-x: hidden;
        }

        @keyframes nodeIn {
          from { opacity: 0; transform: translateX(-18px) scale(0.88); }
          to   { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-8px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-50%) translateY(4px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @keyframes ringPulse {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50%      { opacity: 0.8; transform: scale(1.02); }
        }
        @keyframes float {
          from { transform: translate(0,0); }
          to   { transform: translate(20px, -30px); }
        }
        @keyframes headerGlow {
          0%,100% { text-shadow: 0 0 40px rgba(41,128,185,0.4), 0 0 80px rgba(41,128,185,0.15); }
          50%      { text-shadow: 0 0 60px rgba(41,128,185,0.7), 0 0 120px rgba(41,128,185,0.3); }
        }
        @keyframes scanline {
          0%   { top: -5%; }
          100% { top: 105%; }
        }

        * { box-sizing: border-box; }

        ::-webkit-scrollbar { width: 7px; height: 7px; }
        ::-webkit-scrollbar-track { background: #02040a; }
        ::-webkit-scrollbar-thumb { background: #152040; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #1e3560; }
      `}</style>

      {/* Background grid */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        backgroundImage: `
          linear-gradient(rgba(41,128,185,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(41,128,185,0.04) 1px, transparent 1px)`,
        backgroundSize: '48px 48px',
      }} />

      {/* Scanline effect */}
      <div style={{
        position: 'fixed', left: 0, right: 0, height: '3px', zIndex: 0,
        background: 'linear-gradient(transparent, rgba(41,128,185,0.08), transparent)',
        animation: 'scanline 8s linear infinite', pointerEvents: 'none',
      }} />

      <Particles />

      {/* Header */}
      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: '44px 40px 36px',
        background: 'linear-gradient(180deg, rgba(6,12,26,0.98) 0%, rgba(4,8,16,0.7) 100%)',
        borderBottom: '1px solid rgba(41,128,185,0.12)',
      }}>
        <div style={{ color: '#e74c3c', fontSize: 10, letterSpacing: 7, marginBottom: 12, fontWeight: 600, opacity: 0.9 }}>
          ◆ TAXONOMÍA INTERACTIVA ◆
        </div>
        <h1 style={{
          color: '#f0f4f8', fontSize: 34, fontWeight: 300, letterSpacing: 4,
          margin: 0, animation: 'headerGlow 4s ease-in-out infinite',
        }}>
          Algoritmos de Optimización
        </h1>
        <p style={{ color: '#3d6080', fontSize: 11.5, marginTop: 14, letterSpacing: 2, fontWeight: 400 }}>
          HAGA CLICK PARA EXPANDIR · HOVER PARA DESCRIPCIÓN · ↗ PARA WIKIPEDIA
        </p>
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 32, marginTop: 20,
          color: '#2a3d52', fontSize: 10, letterSpacing: 1,
        }}>
          <span>📌 6 niveles de profundidad</span>
          <span>🌿 23 algoritmos</span>
          <span>🔗 Fuentes en Wikipedia</span>
        </div>
      </div>

      {/* Tree area */}
      <div style={{ position: 'relative', zIndex: 5, padding: '60px 70px 100px', overflowX: 'auto' }}>
        <div ref={containerRef} style={{ position: 'relative', display: 'inline-block', minWidth: 'max-content' }}>
          <ConnectorLines nodeRefs={nodeRefs} expanded={expanded} containerRef={containerRef} />
          <TreeNode node={TREE} depth={0} nodeRefs={nodeRefs} onToggle={toggle} expanded={expanded} />
        </div>
      </div>

      <Legend />
    </div>
  );
}

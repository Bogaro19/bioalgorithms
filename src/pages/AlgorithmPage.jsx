// src/pages/AlgorithmPage.jsx
import { useState } from "react";
import { BgGrid, Scanline } from "../components/SharedUI.jsx";
import { getLevelColor }    from "../data/taxonomyData.js";

export default function AlgorithmPage({ node, onBack, onOpenGif }) {
  const [activeTab,    setActiveTab]    = useState("theory");
  const [activeBmIdx,  setActiveBmIdx]  = useState(0);

  if (!node) return null;
  const color = getLevelColor(node.depth || 0);

  const hasGifs    = node.gifs && node.gifs.length > 0;
  const currentGif = hasGifs ? node.gifs[activeBmIdx] : null;
  const gifSrc     = hasGifs ? currentGif?.src : node.gif;

  const specs = [
    { label:"Nivel de Profundidad",  value:`Nivel ${node.depth + 1}` },
    { label:"Clasificación",         value: node.depth < 2 ? "Categoría Jerárquica" : "Metaheurística" },
    { label:"Inspiración / Origen",  value: node.specs?.inspiration || "Por definir" },
    { label:"Tipo de Búsqueda",      value: node.specs?.searchType  || "Estocástica / Poblacional" },
    { label:"Complejidad (Time)",    value: node.specs?.complexity   || "O(n) pendiente" },
  ];

  const defaultPseudocode = [
    "function MetaheuristicOptimization(population_size, max_iterations):",
    "  Population = InitializeRandomly(population_size)",
    "  while (iter < max_iterations) do",
    "    // 1. Evaluación de Función Objetivo (Benchmark)",
    "    Fitness = Evaluate(Population)",
    "    // 2. Mecanismo de actualización Bioinspirado",
    "    Population = UpdatePositions(Population, Fitness)",
    "    // 3. Selección de la mejor solución global",
    "    GlobalBest = FindBest(Population, Fitness)",
    "  end while",
    "  return GlobalBest",
  ];
  const codeToRender = node.pseudocode || defaultPseudocode;

  return (
    <div style={{ width:"100%", minHeight:"100vh", paddingTop:90, paddingBottom:100, position:"relative" }}>
      <BgGrid /><Scanline />

      <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 40px", position:"relative",
        zIndex:10, animation:"fadeSlideUp 0.4s ease-out" }}>

        {/* HEADER */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:30 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:24 }}>
              <button onClick={onBack} style={{ background:"var(--bg-surface)",
                border:"1px solid var(--border-color)", color:"var(--text-primary)",
                padding:"10px 20px", borderRadius:8, fontSize:13, fontWeight:700,
                cursor:"pointer", display:"flex", alignItems:"center", gap:8, transition:"all .2s" }}
                onMouseEnter={e=>e.currentTarget.style.background="var(--bg-primary)"}
                onMouseLeave={e=>e.currentTarget.style.background="var(--bg-surface)"}>
                ← Volver al Árbol
              </button>
              <div style={{ width:1, height:24, background:"var(--border-color)" }}/>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ width:12, height:12, borderRadius:"50%", background:color,
                  boxShadow:`0 0 12px ${color}80` }}/>
                <span style={{ fontSize:12, fontWeight:800, color, letterSpacing:2,
                  textTransform:"uppercase", fontFamily:"Oxanium, monospace" }}>
                  Ficha Técnica Analítica
                </span>
              </div>
            </div>
            <h1 style={{ fontSize:48, fontWeight:800, color:"var(--text-primary)", margin:0,
              letterSpacing:-1, lineHeight:1.1 }}>
              {node.label.replace('\n',' ')}
            </h1>
          </div>
          {node.url && (
            <button onClick={()=>window.open(node.url,"_blank")}
              style={{ background:"var(--text-primary)", color:"var(--bg-primary)", border:"none",
                borderRadius:8, padding:"14px 28px", fontSize:14, fontWeight:700,
                cursor:"pointer", transition:"transform .2s", boxShadow:"0 4px 14px rgba(0,0,0,.1)" }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              ↗ Documentación Formal
            </button>
          )}
        </div>

        {/* TABS */}
        <div style={{ display:"flex", gap:40, borderBottom:"1px solid var(--border-color)", marginBottom:40 }}>
          {[
            { key:"theory",     label:"Fundamentos y Aplicación" },
            { key:"simulation", label:`Animaciones ${hasGifs ? `(${node.gifs.length})` : ''}` },
            { key:"code",       label:"Arquitectura y Código" },
          ].map(tab => (
            <button key={tab.key} onClick={()=>setActiveTab(tab.key)} style={{
              background:"none", border:"none",
              borderBottom: activeTab===tab.key ? `3px solid ${color}` : "3px solid transparent",
              color: activeTab===tab.key ? "var(--text-primary)" : "var(--text-muted)",
              padding:"0 0 12px", fontSize:15, fontWeight:700, cursor:"pointer",
              transition:"all .2s", opacity: activeTab===tab.key ? 1 : 0.7 }}>
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB A — TEORÍA */}
        {activeTab==="theory" && (
          <div style={{ display:"grid", gridTemplateColumns:"1.5fr 1fr", gap:32,
            animation:"fadeIn .3s ease-out" }}>
            <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
              <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border-color)",
                borderRadius:16, padding:32 }}>
                <h3 style={{ fontSize:18, fontWeight:800, color:"var(--text-primary)", marginBottom:20 }}>
                  Fundamento Matemático y Teórico
                </h3>
                <p style={{ fontSize:15, color:"var(--text-muted)", lineHeight:1.8, margin:0 }}>
                  {node.fullTheory ? node.fullTheory : (
                    <>
                      {node.desc}
                      <br/><br/>
                      <span style={{ opacity:.6, fontStyle:"italic", fontSize:13 }}>
                        [La formalización matemática profunda de este modelo se encuentra actualmente en fase de investigación bibliográfica].
                      </span>
                    </>
                  )}
                </p>
              </div>
              {node.useCases && (
                <div style={{ background:"rgba(39,174,96,.05)", border:"1px solid rgba(39,174,96,.3)",
                  borderRadius:16, padding:32 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
                    <h3 style={{ fontSize:15, fontWeight:800, color:"#27ae60", margin:0,
                      letterSpacing:1, fontFamily:"Oxanium, monospace" }}>USO EN LA INDUSTRIA</h3>
                  </div>
                  <p style={{ fontSize:15, color:"var(--text-primary)", lineHeight:1.8,
                    margin:0, fontWeight:500 }}>{node.useCases}</p>
                </div>
              )}
            </div>
            <div>
              <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border-color)",
                borderRadius:16, padding:"28px 32px" }}>
                <h3 style={{ fontSize:12, fontWeight:800, color:"var(--text-muted)", letterSpacing:1.5,
                  textTransform:"uppercase", marginBottom:24, fontFamily:"Oxanium, monospace" }}>
                  Especificaciones del Modelo
                </h3>
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {specs.map((s,i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between",
                      alignItems:"center",
                      borderBottom: i!==specs.length-1 ? "1px solid var(--border-color)" : "none",
                      paddingBottom: i!==specs.length-1 ? 16 : 0 }}>
                      <span style={{ fontSize:14, color:"var(--text-muted)", fontWeight:600 }}>{s.label}</span>
                      <span style={{ fontSize:14, color:"var(--text-primary)", fontWeight:800,
                        textAlign:"right" }}>{s.value}</span>
                    </div>
                  ))}
                </div>

                {/* Quick GIF preview when available */}
                {hasGifs && (
                  <div style={{ marginTop:24, paddingTop:20, borderTop:"1px solid var(--border-color)" }}>
                    <div style={{ fontSize:11, fontWeight:800, color:"var(--text-muted)",
                      letterSpacing:1.5, textTransform:"uppercase", marginBottom:12,
                      fontFamily:"Oxanium, monospace" }}>
                      Vista Previa — {node.gifs[0].benchmark}
                    </div>
                    <div style={{ borderRadius:8, overflow:"hidden", border:"1px solid var(--border-color)",
                      background:"var(--bg-primary)", cursor:"pointer" }}
                      onClick={()=>{ setActiveTab("simulation"); }}>
                      <img src={node.gifs[0].src} alt="Preview GIF"
                        style={{ width:"100%", height:"auto", display:"block", opacity:.85,
                          transition:"opacity .2s" }}
                        onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                        onMouseLeave={e=>e.currentTarget.style.opacity=".85"} />
                    </div>
                    <div style={{ marginTop:8, fontSize:11, color:"var(--text-muted)",
                      textAlign:"center", cursor:"pointer" }}
                      onClick={()=>setActiveTab("simulation")}>
                      Ver todas las animaciones ({node.gifs.length}) →
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB B — ANIMACIONES */}
        {activeTab==="simulation" && (
          <div style={{ animation:"fadeIn .3s ease-out" }}>
            {hasGifs ? (
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
                {/* Benchmark selector */}
                <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border-color)",
                  borderRadius:16, padding:"20px 24px" }}>
                  <div style={{ fontSize:11, fontWeight:800, color:"var(--text-muted)", letterSpacing:2,
                    textTransform:"uppercase", marginBottom:16, fontFamily:"Oxanium, monospace" }}>
                    FUNCIÓN BENCHMARK — Selecciona para ver la animación
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                    {node.gifs.map((g, i) => (
                      <button key={i} onClick={()=>setActiveBmIdx(i)} style={{
                        padding:"8px 20px", borderRadius:22, fontSize:12, fontWeight:700,
                        fontFamily:"Oxanium, monospace", cursor:"pointer", transition:"all .2s",
                        background: i===activeBmIdx ? color : "var(--bg-primary)",
                        color:       i===activeBmIdx ? "#fff"  : "var(--text-muted)",
                        border:      i===activeBmIdx ? `1px solid ${color}` : "1px solid var(--border-color)",
                        boxShadow:   i===activeBmIdx ? `0 0 16px ${color}44` : "none",
                      }}>{g.benchmark}</button>
                    ))}
                  </div>
                </div>

                {/* GIF viewer */}
                <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border-color)",
                  borderRadius:16, overflow:"hidden" }}>
                  {/* Title bar */}
                  <div style={{ padding:"14px 22px", borderBottom:"1px solid var(--border-color)",
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    background:"var(--bg-primary)" }}>
                    <span style={{ fontSize:12, fontWeight:800, letterSpacing:1,
                      fontFamily:"Oxanium, monospace", color:"var(--text-primary)" }}>
                      {node.label.replace('\n',' ')} &nbsp;·&nbsp; Benchmark: {currentGif?.benchmark}
                    </span>
                    <div style={{ display:"flex", gap:6 }}>
                      <div style={{width:10,height:10,borderRadius:"50%",background:"#e74c3c"}}/>
                      <div style={{width:10,height:10,borderRadius:"50%",background:"#f1c40f"}}/>
                      <div style={{width:10,height:10,borderRadius:"50%",background:"#2ecc71"}}/>
                    </div>
                  </div>

                  {/* GIF */}
                  <div style={{ background:"var(--bg-primary)", display:"flex",
                    alignItems:"center", justifyContent:"center", minHeight:500 }}>
                    <img key={gifSrc} src={gifSrc}
                      alt={`${node.label} sobre ${currentGif?.benchmark}`}
                      style={{ maxWidth:"100%", height:"auto", display:"block" }} />
                  </div>

                  {/* Footer */}
                  <div style={{ padding:"12px 22px", borderTop:"1px solid var(--border-color)",
                    display:"flex", justifyContent:"space-between", alignItems:"center",
                    background:"var(--bg-primary)" }}>
                    <span style={{ fontSize:11, color:"var(--text-muted)", fontFamily:"Oxanium,monospace" }}>
                      Última corrida · 2D · Espacio de búsqueda visualizado
                    </span>
                    <span style={{ fontSize:11, color:"var(--text-muted)" }}>
                      {activeBmIdx+1} / {node.gifs.length}
                    </span>
                  </div>
                </div>

                {/* Grid de thumbnails */}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(180px,1fr))", gap:12 }}>
                  {node.gifs.map((g, i) => (
                    <div key={i} onClick={()=>setActiveBmIdx(i)}
                      style={{ borderRadius:12, overflow:"hidden",
                        border: i===activeBmIdx
                          ? `2px solid ${color}`
                          : "2px solid var(--border-color)",
                        cursor:"pointer", transition:"all .2s",
                        boxShadow: i===activeBmIdx ? `0 0 20px ${color}44` : "none",
                        background:"var(--bg-primary)" }}>
                      <img src={g.src} alt={g.benchmark}
                        style={{ width:"100%", height:120, objectFit:"cover", display:"block",
                          opacity: i===activeBmIdx ? 1 : 0.55, transition:"opacity .2s" }} />
                      <div style={{ padding:"6px 10px", fontSize:10, fontWeight:700,
                        fontFamily:"Oxanium, monospace",
                        color: i===activeBmIdx ? color : "var(--text-muted)" }}>
                        {g.benchmark}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* No GIFs available */
              <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border-color)",
                borderRadius:16, overflow:"hidden" }}>
                <div style={{ padding:"14px 22px", borderBottom:"1px solid var(--border-color)",
                  display:"flex", justifyContent:"space-between", alignItems:"center",
                  background:"var(--bg-primary)" }}>
                  <span style={{ fontSize:12, fontWeight:800, letterSpacing:1,
                    fontFamily:"Oxanium, monospace", color:"var(--text-primary)" }}>
                    ENTORNO DE CONVERGENCIA GRÁFICA
                  </span>
                  <span style={{ display:"flex", gap:6 }}>
                    <div style={{width:10,height:10,borderRadius:"50%",background:"#e74c3c"}}/>
                    <div style={{width:10,height:10,borderRadius:"50%",background:"#f1c40f"}}/>
                    <div style={{width:10,height:10,borderRadius:"50%",background:"#2ecc71"}}/>
                  </span>
                </div>
                <div style={{ height:500, background:"var(--bg-primary)", display:"flex",
                  alignItems:"center", justifyContent:"center" }}>
                  <div style={{ textAlign:"center", color:"var(--text-muted)" }}>
                    <div style={{ fontSize:50, marginBottom:16, opacity:.2 }}>📊</div>
                    <div style={{ fontSize:16, fontWeight:700 }}>Visualización en desarrollo</div>
                    <div style={{ fontSize:14, marginTop:8 }}>
                      Animaciones pendientes de procesamiento con funciones benchmark
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB C — PSEUDOCÓDIGO */}
        {activeTab==="code" && (
          <div style={{ animation:"fadeIn .3s ease-out" }}>
            <div style={{ background:"var(--bg-surface)", border:"1px solid var(--border-color)",
              borderRadius:16, padding:40 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:30 }}>
                <h2 style={{ fontSize:22, fontWeight:800, color:"var(--text-primary)", margin:0 }}>
                  Arquitectura Algorítmica
                </h2>
              </div>
              <div style={{ background:"#1e1e1e", borderRadius:12, padding:32,
                fontFamily:"'Fira Code','Courier New',monospace", fontSize:15, color:"#d4d4d4",
                overflowX:"auto", border:"1px solid #333", lineHeight:1.8,
                boxShadow:"inset 0 4px 10px rgba(0,0,0,.5)" }}>
                {codeToRender.map((line, idx) => {
                  let coloredLine;
                  if (line.includes("//")) {
                    coloredLine = <span style={{ color:"#6a9955" }}>{line}</span>;
                  } else {
                    const parts = line.split(/(function|while|do|end while|return|if|then|end if|for each)/g);
                    coloredLine = parts.map((part, i) =>
                      ["function","while","do","end while","return","if","then","end if","for each"].includes(part)
                        ? <span key={i} style={{ color:"#569cd6" }}>{part}</span>
                        : part
                    );
                  }
                  const indent = ((line.match(/^\s*/) || [""])[0].length) * 10;
                  return (
                    <div key={idx} style={{ paddingLeft:indent, marginTop: line.includes("function") ? 0 : 4 }}>
                      {coloredLine}
                    </div>
                  );
                })}
              </div>
              {!node.pseudocode && (
                <div style={{ marginTop:16, fontSize:13, color:"var(--text-muted)", fontStyle:"italic" }}>
                  * Mostrando arquitectura genérica poblacional. El pseudocódigo específico está pendiente de integración.
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

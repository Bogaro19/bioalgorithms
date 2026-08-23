import { useState } from "react";
import { BgGrid, Scanline } from "../components/SharedUI.jsx";
import { getLevelColor } from "../data/taxonomyData.js";

export default function AlgorithmPage({ node, onBack }) {
  const [activeTab, setActiveTab] = useState("theory"); 

  if (!node) return null;
  const color = getLevelColor(node.depth || 0);

  // Mapeo dinámico de Especificaciones (con fallbacks si la data aún no existe)
  const specs = [
    { label: "Nivel de Profundidad", value: `Nivel ${node.depth + 1}` },
    { label: "Clasificación", value: node.depth < 2 ? "Categoría Jerárquica" : "Metaheurística" },
    { label: "Inspiración / Origen", value: node.specs?.inspiration || "Por definir" },
    { label: "Tipo de Búsqueda", value: node.specs?.searchType || "Estocástica / Poblacional" },
    { label: "Complejidad (Time)", value: node.specs?.complexity || "O(n) pendiente" }
  ];

  // Pseudocódigo por defecto (Genérico para metaheurísticas) por si el nodo no tiene uno propio
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
    "  return GlobalBest"
  ];

  // Usamos el pseudocódigo del nodo o el genérico si está vacío
  const codeToRender = node.pseudocode || defaultPseudocode;

  return (
    <div style={{ width: "100%", minHeight: "100vh", paddingTop: 90, paddingBottom: 100, position: "relative" }}>
      <BgGrid /><Scanline />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 10, animation: "fadeSlideUp 0.4s ease-out" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 30 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <button 
                onClick={onBack} 
                style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", color: "var(--text-primary)", padding: "10px 20px", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, transition: "all 0.2s" }} 
                onMouseEnter={e => e.currentTarget.style.background = "var(--bg-primary)"} 
                onMouseLeave={e => e.currentTarget.style.background = "var(--bg-surface)"}
              >
                ← Volver al Árbol
              </button>
              <div style={{ width: 1, height: 24, background: "var(--border-color)" }}></div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: color, boxShadow: `0 0 12px ${color}80` }}></span>
                <span style={{ fontSize: 12, fontWeight: 800, color: color, letterSpacing: 2, textTransform: "uppercase", fontFamily: "Oxanium, monospace" }}>
                  Ficha Técnica Analítica
                </span>
              </div>
            </div>
            <h1 style={{ fontSize: 48, fontWeight: 800, color: "var(--text-primary)", margin: 0, letterSpacing: -1, lineHeight: 1.1 }}>
              {node.label.replace('\n', ' ')}
            </h1>
          </div>

          {node.url && (
            <button 
              onClick={() => window.open(node.url, "_blank")} 
              style={{ background: "var(--text-primary)", color: "var(--bg-primary)", border: "none", borderRadius: 8, padding: "14px 28px", fontSize: 14, fontWeight: 700, cursor: "pointer", transition: "transform 0.2s", boxShadow: "0 4px 14px rgba(0,0,0,0.1)" }} 
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} 
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
            >
              ↗ Documentación Formal
            </button>
          )}
        </div>

        {/* TABS */}
        <div style={{ display: "flex", gap: 40, borderBottom: "1px solid var(--border-color)", marginBottom: 40 }}>
          <button onClick={() => setActiveTab("theory")} style={{ background: "none", border: "none", borderBottom: activeTab === "theory" ? `3px solid ${color}` : "3px solid transparent", color: activeTab === "theory" ? "var(--text-primary)" : "var(--text-muted)", padding: "0 0 12px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", opacity: activeTab === "theory" ? 1 : 0.7 }}>
            Fundamentos y Aplicación
          </button>
          <button onClick={() => setActiveTab("simulation")} style={{ background: "none", border: "none", borderBottom: activeTab === "simulation" ? `3px solid ${color}` : "3px solid transparent", color: activeTab === "simulation" ? "var(--text-primary)" : "var(--text-muted)", padding: "0 0 12px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", opacity: activeTab === "simulation" ? 1 : 0.7 }}>
            Entorno de Simulación
          </button>
          <button onClick={() => setActiveTab("code")} style={{ background: "none", border: "none", borderBottom: activeTab === "code" ? `3px solid ${color}` : "3px solid transparent", color: activeTab === "code" ? "var(--text-primary)" : "var(--text-muted)", padding: "0 0 12px 0", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", opacity: activeTab === "code" ? 1 : 0.7 }}>
            Arquitectura y Código
          </button>
        </div>
        
        {/* PESTAÑA A: TEORÍA */}
        {activeTab === "theory" && (
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 32, animation: "fadeIn 0.3s ease-out" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 16, padding: "32px", boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
                 <h3 style={{ fontSize: 18, fontWeight: 800, color: "var(--text-primary)", marginBottom: 20 }}>Fundamento Matemático y Teórico</h3>
                 <p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.8, margin: 0 }}>
                   {/* Fallback: Si no hay teoría completa, muestra la descripción corta y un aviso */}
                   {node.fullTheory ? node.fullTheory : (
                     <>
                       {node.desc}
                       <br/><br/>
                       <span style={{ opacity: 0.6, fontStyle: "italic", fontSize: 13 }}>[La formalización matemática profunda de este modelo se encuentra actualmente en fase de investigación bibliográfica].</span>
                     </>
                   )}
                 </p>
              </div>

              {node.useCases && (
                <div style={{ background: "rgba(39, 174, 96, 0.05)", border: "1px solid rgba(39, 174, 96, 0.3)", borderRadius: 16, padding: "32px", boxShadow: "0 10px 30px rgba(39, 174, 96, 0.05)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    
                    <h3 style={{ fontSize: 15, fontWeight: 800, color: "#27ae60", margin: 0, letterSpacing: 1, fontFamily: "Oxanium, monospace" }}>USO EN LA INDUSTRIA</h3>
                  </div>
                  <p style={{ fontSize: 15, color: "var(--text-primary)", lineHeight: 1.8, margin: 0, fontWeight: 500 }}>{node.useCases}</p>
                </div>
              )}
            </div>

            <div>
              <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 16, padding: "28px 32px", boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
                <h3 style={{ fontSize: 12, fontWeight: 800, color: "var(--text-muted)", letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 24, fontFamily: "Oxanium, monospace" }}>Especificaciones del Modelo</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {specs.map((s, i) => (
                    <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: i !== specs.length - 1 ? "1px solid var(--border-color)" : "none", paddingBottom: i !== specs.length - 1 ? 16 : 0 }}>
                      <span style={{ fontSize: 14, color: "var(--text-muted)", fontWeight: 600 }}>{s.label}</span>
                      <span style={{ fontSize: 14, color: "var(--text-primary)", fontWeight: 800, textAlign: "right" }}>{s.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA B: SIMULACIÓN */}
        {activeTab === "simulation" && (
          <div style={{ animation: "fadeIn 0.3s ease-out" }}>
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 16, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.04)", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-primary)" }}>
                <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1, fontFamily: "Oxanium, monospace", color: "var(--text-primary)" }}>ENTORNO DE CONVERGENCIA GRÁFICA</span>
                <span style={{ display: "flex", gap: 6 }}>
                  <div style={{width: 10, height: 10, borderRadius: "50%", background: "#e74c3c"}}></div>
                  <div style={{width: 10, height: 10, borderRadius: "50%", background: "#f1c40f"}}></div>
                  <div style={{width: 10, height: 10, borderRadius: "50%", background: "#2ecc71"}}></div>
                </span>
              </div>
              <div style={{ width: "100%", height: 600, background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                {node.gif ? (
                   <img src={node.gif} alt={`Simulación de ${node.label}`} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                ) : (
                  <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
                    <div style={{ fontSize: 50, marginBottom: 16, opacity: 0.2 }}>📊</div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>Visualización en desarrollo</div>
                    <div style={{ fontSize: 14, marginTop: 8 }}>Se requiere procesar el entorno con funciones benchmark (ej. Rastrigin, Sphere)</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PESTAÑA C: PSEUDOCÓDIGO DINÁMICO */}
        {activeTab === "code" && (
          <div style={{ animation: "fadeIn 0.3s ease-out" }}>
            <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 16, padding: 40, boxShadow: "0 10px 40px rgba(0,0,0,0.04)" }}>
               <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--text-primary)", margin: 0 }}>Arquitectura Algorítmica</h2>
               </div>

               <div style={{ background: "#1e1e1e", borderRadius: 12, padding: "32px", fontFamily: "'Fira Code', 'Courier New', monospace", fontSize: 15, color: "#d4d4d4", overflowX: "auto", border: "1px solid #333", lineHeight: 1.8, boxShadow: "inset 0 4px 10px rgba(0,0,0,0.5)" }}>
                  {/* Iteramos sobre el arreglo de pseudocódigo */}
                  {codeToRender.map((line, index) => {
                    // Logiquita básica para dar colores a palabras clave
                    let coloredLine = line;
                    if (line.includes("//")) {
                      coloredLine = <span style={{ color: "#6a9955" }}>{line}</span>;
                    } else {
                      // Coloreamos palabras clave como function, while, return
                      const parts = line.split(/(function|while|do|end while|return|if|then|end if|for each)/g);
                      coloredLine = parts.map((part, i) => 
                        ["function", "while", "do", "end while", "return", "if", "then", "end if", "for each"].includes(part) 
                          ? <span key={i} style={{ color: "#569cd6" }}>{part}</span> 
                          : part
                      );
                    }
                    
                    // Calculamos la indentación basándonos en los espacios al inicio
                    const indent = (line.match(/^\s*/) || [""])[0].length * 10;

                    return (
                      <div key={index} style={{ paddingLeft: indent, marginTop: line.includes("function") ? 0 : 4 }}>
                        {coloredLine}
                      </div>
                    );
                  })}
               </div>
               
               {!node.pseudocode && (
                 <div style={{ marginTop: 16, fontSize: 13, color: "var(--text-muted)", fontStyle: "italic" }}>
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
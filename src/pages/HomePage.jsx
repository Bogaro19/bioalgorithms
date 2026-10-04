import { STATS } from "../data/taxonomyData.js";
import { BgGrid, Scanline, Particles } from "../components/SharedUI.jsx";

// Componente: Animación de Red / Enjambre para el inicio
const SwarmGraphic = () => (
  <div style={{ position: "relative", width: "100%", height: 400, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Órbitas rotatorias */}
      <g style={{ transformOrigin: "200px 200px", animation: "spin 30s linear infinite" }}>
        <circle cx="200" cy="200" r="140" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="4 8" />
        <circle cx="200" cy="60" r="4" fill="var(--color-category)" />
        <circle cx="100" cy="300" r="6" fill="var(--color-subcategory)" />
        <circle cx="340" cy="200" r="3" fill="var(--color-method)" />
      </g>
      <g style={{ transformOrigin: "200px 200px", animation: "spinReverse 20s linear infinite" }}>
        <circle cx="200" cy="200" r="90" fill="none" stroke="var(--border-color)" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="200" cy="110" r="5" fill="var(--color-family)" />
        <circle cx="120" cy="240" r="4" fill="var(--color-method)" />
      </g>

      {/* Conexiones simulando red neuronal / enjambre */}
      <path d="M200,200 L200,110 M200,200 L120,240 M200,200 L340,200 M200,200 L100,300 M200,200 L200,60" stroke="var(--color-category)" strokeWidth="1" opacity="0.3" />
      
      {/* Nodo central (Óptimo Global) */}
      <circle cx="200" cy="200" r="16" fill="var(--color-root)" filter="url(#glow)">
        <animate attributeName="r" values="14;18;14" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
    <style>
      {`
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes spinReverse { 100% { transform: rotate(-360deg); } }
      `}
    </style>
  </div>
);

export default function HomePage({ onGoTree }) {
  return (
    <div style={{ width: "100%", minHeight: "100vh", fontFamily: "'Inter', system-ui, -apple-system, sans-serif", paddingTop: 100 }}>
      <BgGrid /><Scanline /><Particles />
      
      {/* ==========================================================
          SECCIÓN 1: HERO
      ========================================================== */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 40px 80px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
          
          <div style={{ textAlign: "left" }}>
           
            
            <h1 style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.05, letterSpacing: -1.5, margin: "0 0 20px 0", color: "var(--text-primary)" }}>
              Inteligencia <br />
              <span style={{ color: "var(--color-category)" }}>Bioinspirada</span>
            </h1>
            
            <p style={{ color: "var(--text-muted)", fontSize: 18, lineHeight: 1.6, margin: "0 0 40px 0", maxWidth: 480 }}>
              Explora cómo los procesos de la naturaleza modelan la inteligencia artificial para resolver los problemas de optimización más complejos de la industria.
            </p>
            
            <button onClick={onGoTree} style={{ background: "var(--text-primary)", color: "var(--bg-primary)", border: "none", borderRadius: 8, padding: "16px 36px", fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "all 0.2s ease", boxShadow: "0 8px 24px rgba(0,0,0,0.12)" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              Abrir Taxonomía Interactiva →
            </button>
          </div>

          <div>
            <SwarmGraphic />
          </div>
          
        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 2: CINTA DE MÉTRICAS 
      ========================================================== */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "40px 0", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 40px" }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 42, fontWeight: 800, color: s.color, lineHeight: 1, fontFamily: "Oxanium, monospace" }}>{s.value}</div>
              <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 8, fontWeight: 600, letterSpacing: 0.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 3: IMPACTO EN LA INDUSTRIA
      ========================================================== */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "100px 40px", position: "relative", zIndex: 10 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "var(--text-primary)", letterSpacing: -1, marginBottom: 20 }}>
              Soluciones a Problemas <br/> NP-Hard
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              La optimización matemática pura falla ante la explosión combinatoria. Las metaheurísticas como el <em>Enjambre de Partículas (PSO)</em> o la <em>Evolución Diferencial (DE)</em> permiten encontrar soluciones de altísima calidad en tiempos computacionales viables.
            </p>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.8 }}>
              Su integración es fundamental para el desarrollo de sistemas de <strong>gestión logística inteligente en PyMEs</strong>, permitiendo resolver escenarios críticos como el enrutamiento de vehículos con ventanas de tiempo (CVRPTW) y la optimización de flotas.
            </p>
          </div>

          <div style={{ background: "var(--bg-surface)", borderRadius: 24, padding: 40, border: "1px solid var(--border-color)", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)", display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 16, borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: 28 }}>📦</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Gestión de Flotas (CVRPTW)</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Minimización de costos y distancias.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, paddingBottom: 16, borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ fontSize: 28 }}>⚙️</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Procesamiento de Datos</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Ajuste de hiperparámetros en Machine Learning.</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 28 }}>📈</div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "var(--text-primary)" }}>Pronóstico de Demanda</div>
                <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Series de tiempo y redes neuronales recurrentes.</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 4: BASE CIENTÍFICA  
      ========================================================== */}
      <section style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "100px 0", position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          
          <div style={{ position: "relative", height: "100%", minHeight: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", width: "100%", height: "100%", background: "radial-gradient(circle, var(--color-method) 0%, transparent 60%)", opacity: 0.05 }} />
            <div style={{ fontSize: 140, fontWeight: 800, color: "var(--bg-primary)", WebkitTextStroke: "2px var(--color-method)", opacity: 0.8, fontFamily: "Oxanium, monospace", letterSpacing: -5 }}>
              518+
            </div>
            <div style={{ position: "absolute", bottom: 40, background: "var(--text-primary)", color: "var(--bg-primary)", padding: "8px 20px", borderRadius: 8, fontSize: 14, fontWeight: 700 }}>
              Algoritmos Analizados
            </div>
          </div>

          <div>
            <h2 style={{ fontSize: 36, fontWeight: 800, color: "var(--text-primary)", letterSpacing: -1, marginBottom: 20 }}>
              Respaldo en la <br/> Literatura Científica
            </h2>
            <p style={{ color: "var(--text-muted)", fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>
              La plataforma no es un catálogo arbitrario. Es el resultado de procesar y sintetizar extensas revisiones del estado del arte, filtrando técnicas redundantes para presentar una taxonomía funcional.
            </p>
            <ul style={{ color: "var(--text-muted)", fontSize: 15, lineHeight: 2, paddingLeft: 20, margin: 0 }}>
              <li>Categorización jerárquica estricta por <strong>comportamiento y fuente de inspiración</strong>.</li>
              <li>Integración de las 4 funciones de prueba (benchmark) más representativas: <em>Sphere, Rastrigin, Ackley y Rosenbrock</em>.</li>
              <li>Migración nativa de la librería matemática <strong>EAPack v7.0</strong> (Python a JS Puro).</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 5: DESARROLLO Y CRÉDITOS
      ========================================================== */}
      <section style={{ maxWidth: 1000, margin: "0 auto", padding: "100px 40px", position: "relative", zIndex: 10, textAlign: "center" }}>
        <h2 style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", letterSpacing: -0.5, marginBottom: 16 }}>Desarrollo e Investigación</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 40, maxWidth: 600, margin: "0 auto 50px" }}>
          Esta plataforma de visualización y simulación forma parte del protocolo de Trabajo Terminal de ingeniería de software.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, textAlign: "left" }}>
          
          <div style={{ background: "transparent", border: "1px solid var(--border-color)", borderRadius: 16, padding: "32px", display: "flex", gap: 20 }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: "var(--bg-surface)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              🎓
            </div>
            <div>
              <div style={{ fontSize: 12, color: "var(--color-category)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>AUTORÍA</div>
              <div style={{ fontSize: 18, color: "var(--text-primary)", fontWeight: 700, marginBottom: 8 }}>Autor</div>
              <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5 }}>IPN.<br/>Servicio Social: algoritmos aplicados.</div>
            </div>
          </div>

          <div style={{ background: "transparent", border: "1px solid var(--border-color)", borderRadius: 16, padding: "32px", display: "flex", gap: 20 }}>
            <div style={{ width: 50, height: 50, borderRadius: "50%", background: "var(--bg-surface)", border: "1px solid var(--border-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
              🏛️
            </div>
            <div>
              <div style={{ fontSize: 12, color: "var(--color-method)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>INSTITUCIÓN</div>
              <div style={{ fontSize: 18, color: "var(--text-primary)", fontWeight: 700, marginBottom: 8 }}>ESCOM · IPN</div>
              <div style={{ fontSize: 14, color: "var(--text-muted)", lineHeight: 1.5 }}>Avalado por el Centro de Investigación en Computación (CIC).</div>
            </div>
          </div>

        </div>
      </section>

      {/* ==========================================================
          SECCIÓN 6: CALL TO ACTION FINAL
      ========================================================== */}
      <section style={{ padding: "0 40px 100px", textAlign: "center", position: "relative", zIndex: 10 }}>
        <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", borderRadius: 24, padding: "60px 40px", maxWidth: 900, margin: "0 auto", boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)" }}>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", letterSpacing: -0.5, marginBottom: 16 }}>¿Listo para empezar?</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16, marginBottom: 30 }}>
            Navega por la taxonomía, consulta la teoría matemática y observa la convergencia de los simuladores en tiempo real.
          </p>
          <button onClick={onGoTree} style={{ background: "var(--color-category)", color: "#fff", border: "none", borderRadius: 8, padding: "16px 40px", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "transform 0.2s ease" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            Acceder a la Biblioteca
          </button>
        </div>
      </section>

    </div>
  );
}
import { useState, useRef, useCallback } from "react";

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
      desc: "Incorporan aleatoriedad. Pueden producir diferentes resultados en cada ejecución.",
      children: [
        {
          id: "metaheuristicos",
          label: "Algoritmos\nMetaheurísticos",
          url: "https://es.wikipedia.org/wiki/Metaheur%C3%ADstica",
          desc: "Estrategias de alto nivel que guían la búsqueda heurística. Inspirados en fenómenos naturales.",
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
                  desc: "Simulan el proceso de evolución biológica mediante selección, cruce y mutación.",
                  children: [
                    { id: "geneticos", label: "Algoritmos\nGenéticos", url: "https://es.wikipedia.org/wiki/Algoritmo_gen%C3%A9tico", desc: "Operan sobre cromosomas usando selección natural, cruce y mutación para evolucionar soluciones.", children: [] },
                    { id: "diferencial", label: "Evolución\nDiferencial", url: "https://es.wikipedia.org/wiki/Evoluci%C3%B3n_diferencial", desc: "Perturba vectores de solución sumando diferencias ponderadas. Muy robusto en espacios continuos.", children: [] },
                    { id: "prog-gen", label: "Programación\nGenética", url: "https://es.wikipedia.org/wiki/Programaci%C3%B3n_gen%C3%A9tica", desc: "Evoluciona programas representados como árboles. Usada en diseño automático de modelos.", children: [] },
                  ]
                },
                {
                  id: "colectiva",
                  label: "Inteligencia\nColectiva",
                  url: "https://es.wikipedia.org/wiki/Inteligencia_de_enjambre",
                  desc: "Basados en el comportamiento colectivo emergente de agentes simples interactuando localmente.",
                  children: [
                    { id: "pso", label: "Enjambre de\nPartículas (PSO)", url: "https://es.wikipedia.org/wiki/Optimizaci%C3%B3n_por_enjambre_de_part%C3%ADculas", desc: "Partículas exploran el espacio influenciadas por su mejor posición histórica y la del vecindario.", children: [] },
                    { id: "abc", label: "Colonia\nde Abejas", url: "https://en.wikipedia.org/wiki/Artificial_bee_colony_algorithm", desc: "Imita el comportamiento de abejas buscando alimento. Abejas exploradoras y empleadas cooperan.", children: [] },
                    { id: "aco", label: "Colonia\nde Hormigas", url: "https://es.wikipedia.org/wiki/Algoritmo_de_colonia_de_hormigas", desc: "Simula el depósito de feromonas. Excelente para problemas combinatorios como el TSP.", children: [] },
                  ]
                }
              ]
            },
            {
              id: "trayectoria",
              label: "Basados en\nTrayectoria",
              url: "https://en.wikipedia.org/wiki/Simulated_annealing",
              desc: "Parten de una única solución y la mejoran iterativamente siguiendo una trayectoria.",
              children: [
                { id: "caminata", label: "Caminata\nAleatoria", url: "https://es.wikipedia.org/wiki/Camino_aleatorio", desc: "Exploración mediante pasos aleatorios sucesivos. Base teórica para muchos algoritmos.", children: [] },
                { id: "recocido", label: "Recocido\nSimulado", url: "https://es.wikipedia.org/wiki/Recocido_simulado", desc: "Acepta soluciones peores con probabilidad decreciente (temperatura). Puede escapar de mínimos locales.", children: [] },
                { id: "tabu", label: "Búsqueda\nTabú", url: "https://es.wikipedia.org/wiki/B%C3%BAsqueda_tab%C3%BA", desc: "Usa memoria a corto plazo (lista tabú) para prohibir movimientos recientes y evitar ciclos.", children: [] },
              ]
            }
          ]
        },
        {
          id: "heuristicos",
          label: "Algoritmos\nHeurísticos",
          url: "https://es.wikipedia.org/wiki/Heur%C3%ADstica_(inform%C3%A1tica)",
          desc: "Técnicas basadas en reglas prácticas y experiencia. No garantizan la solución óptima pero son eficientes.",
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
// SHARED: GLOBAL STYLES
// ═══════════════════════════════════════════════════════
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; background: #040810; overflow-x: hidden; }

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
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes cardReveal {
    from { opacity: 0; transform: translateY(24px) scale(0.96); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes borderSpin {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  @keyframes logoGlow {
    0%,100% { filter: drop-shadow(0 0 8px rgba(41,128,185,0.3)); }
    50%      { filter: drop-shadow(0 0 20px rgba(41,128,185,0.7)); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: scale(0.7); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes lineDraw {
    from { width: 0; }
    to   { width: 100%; }
  }

  ::-webkit-scrollbar { width: 7px; height: 7px; }
  ::-webkit-scrollbar-track { background: #02040a; }
  ::-webkit-scrollbar-thumb { background: #152040; border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: #1e3560; }
`;

// ═══════════════════════════════════════════════════════
// SHARED: BACKGROUND ELEMENTS
// ═══════════════════════════════════════════════════════
function BgGrid() {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      backgroundImage: `
        linear-gradient(rgba(41,128,185,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(41,128,185,0.04) 1px, transparent 1px)`,
      backgroundSize: '48px 48px',
    }} />
  );
}

function Scanline() {
  return (
    <div style={{
      position: 'fixed', left: 0, right: 0, height: '3px', zIndex: 0,
      background: 'linear-gradient(transparent, rgba(41,128,185,0.08), transparent)',
      animation: 'scanline 8s linear infinite', pointerEvents: 'none',
    }} />
  );
}

function Particles() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    dur: Math.random() * 15 + 10, delay: Math.random() * 10,
    color: DC[Math.floor(Math.random() * DC.length)].glow,
  }));
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map(p => (
        <div key={p.id} style={{
          position: 'absolute', left: `${p.x}%`, top: `${p.y}%`,
          width: p.size, height: p.size, borderRadius: '50%', background: p.color,
          opacity: 0.4, animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,
          boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
        }} />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// SHARED: TOP HEADER BAR WITH LOGOS
// ═══════════════════════════════════════════════════════
function TopBar({ onNav, currentPage }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: 72,
      background: 'rgba(4,8,18,0.96)',
      borderBottom: '1px solid rgba(41,128,185,0.18)',
      backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 28px',
      animation: 'slideDown 0.5s ease',
    }}>
      {/* IPN Logo — left */}
      <img
        src="/ipn-logo.png" alt="IPN"
        style={{
          height: 52, width: 'auto', objectFit: 'contain',
          animation: 'logoGlow 4s ease-in-out infinite',
          cursor: 'pointer',
        }}
        onClick={() => window.open('https://www.ipn.mx', '_blank')}
      />

      {/* Nav links — center */}
      <div style={{ display: 'flex', gap: 8 }}>
        {[
          { id: 'home', label: '⌂ Inicio' },
          { id: 'tree', label: '🌿 Taxonomía' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => onNav(item.id)}
            style={{
              background: currentPage === item.id
                ? 'linear-gradient(135deg, rgba(41,128,185,0.25), rgba(0,180,216,0.15))'
                : 'rgba(255,255,255,0.03)',
              border: `1px solid ${currentPage === item.id ? 'rgba(41,128,185,0.6)' : 'rgba(41,128,185,0.15)'}`,
              borderRadius: 8, color: currentPage === item.id ? '#79c0ef' : '#4a6a85',
              padding: '7px 20px', fontSize: 12, fontFamily: 'Oxanium, monospace',
              fontWeight: 600, letterSpacing: 1.5, cursor: 'pointer',
              transition: 'all 0.25s',
              boxShadow: currentPage === item.id ? '0 0 14px rgba(41,128,185,0.25)' : 'none',
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* CIC Logo — right */}
      <img
        src="/cic-logo.png" alt="CIC"
        style={{
          height: 44, width: 'auto', objectFit: 'contain',
          animation: 'logoGlow 4s ease-in-out 2s infinite',
          cursor: 'pointer',
        }}
        onClick={() => window.open('https://www.cic.ipn.mx', '_blank')}
      />
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// HOME PAGE
// ═══════════════════════════════════════════════════════
const STATS = [
  { value: '23', label: 'Algoritmos', color: '#2980b9', rgb: '41,128,185', icon: '⚙' },
  { value: '6',  label: 'Niveles de profundidad', color: '#e74c3c', rgb: '231,76,60', icon: '◈' },
  { value: '2',  label: 'Categorías principales', color: '#27ae60', rgb: '39,174,96', icon: '⬡' },
  { value: '5',  label: 'Familias algorítmicas', color: '#9b59b6', rgb: '155,89,182', icon: '✦' },
];

const CATEGORIES = [
  {
    title: 'Algoritmos Deterministas',
    color: '#2980b9', rgb: '41,128,185',
    icon: '◉',
    desc: 'Producen exactamente el mismo resultado cada vez que se ejecutan con las mismas condiciones iniciales. Su comportamiento es completamente predecible y reproducible.',
    sub: ['Búsqueda Directa', 'Búsqueda Indirecta', 'Escalador de Colina', 'Nelder-Mead', 'Método de Newton', 'Gradiente Descendente'],
    delay: 0,
  },
  {
    title: 'Algoritmos Estocásticos',
    color: '#27ae60', rgb: '39,174,96',
    icon: '◈',
    desc: 'Incorporan elementos de aleatoriedad en su funcionamiento. Aunque se ejecuten con las mismas condiciones iniciales, pueden producir diferentes trayectorias y resultados.',
    sub: ['Metaheurísticos', 'Heurísticos', 'Evolutivos', 'Inteligencia Colectiva', 'Basados en Trayectoria'],
    delay: 120,
  },
];

const FAMILIES = [
  { name: 'Evolutivos', color: '#27ae60', icon: '🧬', desc: 'Simulan la evolución biológica: selección, cruce y mutación sobre poblaciones de soluciones.' },
  { name: 'Inteligencia Colectiva', color: '#f39c12', icon: '🐝', desc: 'Comportamiento emergente de agentes simples: PSO, colonias de abejas y hormigas.' },
  { name: 'Basados en Trayectoria', color: '#9b59b6', icon: '〰', desc: 'Parten de una solución y la refinan iterativamente: recocido simulado, búsqueda tabú.' },
  { name: 'Búsqueda Directa', color: '#2980b9', icon: '◎', desc: 'No usan derivadas; evalúan la función directamente en puntos del espacio de búsqueda.' },
  { name: 'Búsqueda Indirecta', color: '#00b4d8', icon: '∇', desc: 'Explotan información del gradiente para converger eficientemente hacia óptimos.' },
];

function StatCard({ value, label, color, rgb, icon, delay }) {
  return (
    <div style={{
      background: `linear-gradient(145deg, rgba(${rgb},0.08), rgba(${rgb},0.04))`,
      border: `1px solid rgba(${rgb},0.3)`,
      borderRadius: 14, padding: '28px 24px', textAlign: 'center',
      animation: `cardReveal 0.6s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms both`,
      position: 'relative', overflow: 'hidden',
      transition: 'transform 0.2s, box-shadow 0.2s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 12px 40px rgba(${rgb},0.25)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = '';
      }}
    >
      <div style={{ fontSize: 26, marginBottom: 8, opacity: 0.85 }}>{icon}</div>
      <div style={{
        fontSize: 48, fontWeight: 800, color, lineHeight: 1,
        textShadow: `0 0 30px rgba(${rgb},0.6)`,
        animation: `countUp 0.8s cubic-bezier(0.34,1.4,0.64,1) ${delay + 200}ms both`,
      }}>{value}</div>
      <div style={{ color: '#607590', fontSize: 11, letterSpacing: 1.5, marginTop: 8, fontWeight: 500 }}>
        {label.toUpperCase()}
      </div>
      {/* corner glow */}
      <div style={{
        position: 'absolute', bottom: -20, right: -20, width: 80, height: 80,
        borderRadius: '50%', background: `rgba(${rgb},0.08)`,
        pointerEvents: 'none',
      }} />
    </div>
  );
}

function CategoryCard({ title, color, rgb, icon, desc, sub, delay, onGoTree }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov
          ? `linear-gradient(145deg, rgba(${rgb},0.14), rgba(${rgb},0.07))`
          : `linear-gradient(145deg, rgba(${rgb},0.07), rgba(${rgb},0.03))`,
        border: `1.5px solid rgba(${rgb}, ${hov ? '0.6' : '0.25'})`,
        borderRadius: 16, padding: '30px 28px',
        animation: `cardReveal 0.7s cubic-bezier(0.34,1.2,0.64,1) ${delay}ms both`,
        transition: 'all 0.3s',
        boxShadow: hov ? `0 0 40px rgba(${rgb},0.2), inset 0 1px 0 rgba(255,255,255,0.06)` : 'none',
        cursor: 'default', flex: 1,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 10,
          background: `rgba(${rgb},0.15)`, border: `1px solid rgba(${rgb},0.4)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 22, boxShadow: hov ? `0 0 20px rgba(${rgb},0.4)` : 'none',
          transition: 'box-shadow 0.3s',
        }}>{icon}</div>
        <div style={{ color, fontSize: 16, fontWeight: 700, letterSpacing: 0.5 }}>{title}</div>
      </div>
      <p style={{ color: '#8aaac0', fontSize: 13, lineHeight: 1.75, marginBottom: 20 }}>{desc}</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {sub.map(s => (
          <span key={s} style={{
            background: `rgba(${rgb},0.1)`, border: `1px solid rgba(${rgb},0.25)`,
            borderRadius: 6, padding: '4px 12px', fontSize: 10, color,
            letterSpacing: 0.8, fontWeight: 500,
          }}>{s}</span>
        ))}
      </div>
    </div>
  );
}

function HomePage({ onGoTree }) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#040810', fontFamily: 'Oxanium, monospace', paddingTop: 72 }}>
      <BgGrid /><Scanline /><Particles />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: '80px 40px 70px',
        background: 'linear-gradient(180deg, rgba(6,12,26,0.98) 0%, rgba(4,8,16,0.7) 100%)',
        borderBottom: '1px solid rgba(41,128,185,0.1)',
      }}>
        {/* Animated border top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #2980b9, #e74c3c, #27ae60, #9b59b6, transparent)',
          backgroundSize: '200% 100%', animation: 'borderSpin 4s linear infinite',
        }} />

        <div style={{ color: '#e74c3c', fontSize: 10, letterSpacing: 7, marginBottom: 16, fontWeight: 600, opacity: 0.9 }}>
          ◆ PROYECTO DE INVESTIGACIÓN — IPN · CIC ◆
        </div>
        <h1 style={{
          color: '#f0f4f8', fontSize: 46, fontWeight: 300, letterSpacing: 3,
          margin: '0 0 10px', animation: 'headerGlow 4s ease-in-out infinite',
          lineHeight: 1.15,
        }}>
          Algoritmos de Optimización
        </h1>
        <h2 style={{ color: '#2980b9', fontSize: 18, fontWeight: 400, letterSpacing: 4, margin: '0 0 28px', opacity: 0.85 }}>
          Taxonomía Interactiva
        </h2>

        {/* Animated underline */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 32 }}>
          <div style={{
            height: 1, background: 'linear-gradient(90deg, transparent, #2980b9, transparent)',
            animation: 'lineDraw 1.5s ease 0.5s both', width: '340px',
          }} />
        </div>

        <p style={{
          color: '#607590', fontSize: 15, maxWidth: 680, margin: '0 auto 40px',
          lineHeight: 1.9, animation: 'fadeUp 0.8s ease 0.3s both',
        }}>
          Una herramienta visual e interactiva para explorar, comprender y clasificar los principales
          algoritmos de optimización, desde métodos deterministas clásicos hasta técnicas
          metaheurísticas inspiradas en la naturaleza.
        </p>

        <button
          onClick={onGoTree}
          style={{
            background: 'linear-gradient(135deg, rgba(41,128,185,0.3), rgba(0,180,216,0.2))',
            border: '1.5px solid rgba(41,128,185,0.7)', borderRadius: 10,
            color: '#79c0ef', padding: '14px 44px', fontSize: 13,
            fontFamily: 'Oxanium, monospace', fontWeight: 700, letterSpacing: 2,
            cursor: 'pointer', transition: 'all 0.25s',
            boxShadow: '0 0 30px rgba(41,128,185,0.2)',
            animation: 'fadeUp 0.8s ease 0.6s both',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(41,128,185,0.5), rgba(0,180,216,0.35))';
            e.currentTarget.style.boxShadow = '0 0 50px rgba(41,128,185,0.45)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(41,128,185,0.3), rgba(0,180,216,0.2))';
            e.currentTarget.style.boxShadow = '0 0 30px rgba(41,128,185,0.2)';
            e.currentTarget.style.transform = '';
          }}
        >
          🌿 EXPLORAR TAXONOMÍA →
        </button>
      </section>

      {/* ── STATS ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '60px 60px 50px' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, maxWidth: 900, margin: '0 auto',
        }}>
          {STATS.map((s, i) => <StatCard key={s.label} {...s} delay={i * 100} />)}
        </div>
      </section>

      {/* Divider */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ height: 1, width: '100%', maxWidth: 860, background: 'linear-gradient(90deg, transparent, rgba(41,128,185,0.2), transparent)' }} />
      </div>

      {/* ── ABOUT PROJECT ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '60px 60px 50px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ color: '#2980b9', fontSize: 9, letterSpacing: 6, fontWeight: 600, marginBottom: 12 }}>SOBRE EL PROYECTO</div>
          <h3 style={{ color: '#ecf0f1', fontSize: 26, fontWeight: 400, letterSpacing: 1 }}>Propósito y Alcance</h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            { icon: '🎯', title: 'Objetivo Principal', color: '#e74c3c', rgb: '231,76,60', delay: 0,
              text: 'Proporcionar una visión estructurada y jerárquica de los algoritmos de optimización, facilitando su comprensión, clasificación y selección para problemas específicos en el campo de la inteligencia artificial y la investigación de operaciones.' },
            { icon: '🔬', title: 'Enfoque Académico', color: '#2980b9', rgb: '41,128,185', delay: 100,
              text: 'Desarrollado en el Centro de Investigación en Computación (CIC) del Instituto Politécnico Nacional (IPN), este proyecto busca apoyar la formación de investigadores y estudiantes mediante una herramienta pedagógica moderna e interactiva.' },
            { icon: '📊', title: 'Cobertura', color: '#27ae60', rgb: '39,174,96', delay: 200,
              text: 'La taxonomía abarca desde métodos clásicos como el Gradiente Descendente y el Método de Newton, hasta técnicas modernas como algoritmos genéticos, colonias de hormigas, enjambre de partículas y recocido simulado.' },
            { icon: '🌐', title: 'Recursos Externos', color: '#9b59b6', rgb: '155,89,182', delay: 300,
              text: 'Cada nodo del árbol interactivo está vinculado a su artículo correspondiente en Wikipedia, permitiendo al usuario profundizar en los fundamentos matemáticos, casos de uso y bibliografía de cada algoritmo.' },
          ].map(card => (
            <div
              key={card.title}
              style={{
                background: `linear-gradient(145deg, rgba(${card.rgb},0.07), rgba(${card.rgb},0.03))`,
                border: `1px solid rgba(${card.rgb},0.2)`,
                borderRadius: 14, padding: '26px 24px',
                animation: `cardReveal 0.7s cubic-bezier(0.34,1.2,0.64,1) ${card.delay + 200}ms both`,
                transition: 'all 0.25s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = `rgba(${card.rgb},0.5)`;
                e.currentTarget.style.boxShadow = `0 8px 30px rgba(${card.rgb},0.12)`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = `rgba(${card.rgb},0.2)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <span style={{ fontSize: 22 }}>{card.icon}</span>
                <span style={{ color: card.color, fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>{card.title}</span>
              </div>
              <p style={{ color: '#7a9ab8', fontSize: 12.5, lineHeight: 1.8 }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ height: 1, width: '100%', maxWidth: 860, background: 'linear-gradient(90deg, transparent, rgba(39,174,96,0.2), transparent)' }} />
      </div>

      {/* ── CATEGORIES ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '60px 60px 50px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ color: '#27ae60', fontSize: 9, letterSpacing: 6, fontWeight: 600, marginBottom: 12 }}>CLASIFICACIÓN</div>
          <h3 style={{ color: '#ecf0f1', fontSize: 26, fontWeight: 400, letterSpacing: 1 }}>Categorías Principales</h3>
        </div>
        <div style={{ display: 'flex', gap: 20 }}>
          {CATEGORIES.map(c => <CategoryCard key={c.title} {...c} onGoTree={onGoTree} />)}
        </div>
      </section>

      {/* Divider */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '0 60px' }}>
        <div style={{ height: 1, width: '100%', maxWidth: 860, background: 'linear-gradient(90deg, transparent, rgba(155,89,182,0.2), transparent)' }} />
      </div>

      {/* ── ALGORITHM FAMILIES ── */}
      <section style={{ position: 'relative', zIndex: 10, padding: '60px 60px 50px', maxWidth: 960, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <div style={{ color: '#9b59b6', fontSize: 9, letterSpacing: 6, fontWeight: 600, marginBottom: 12 }}>ESTRUCTURA</div>
          <h3 style={{ color: '#ecf0f1', fontSize: 26, fontWeight: 400, letterSpacing: 1 }}>Familias Algorítmicas</h3>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center' }}>
          {FAMILIES.map((f, i) => {
            const [hov, setHov] = useState(false);
            return (
              <div key={f.name}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{
                  background: hov ? `rgba(4,8,18,0.95)` : 'rgba(8,16,32,0.7)',
                  border: `1px solid ${hov ? f.color + 'aa' : f.color + '33'}`,
                  borderRadius: 12, padding: '18px 22px', width: 'calc(33% - 10px)',
                  minWidth: 220,
                  animation: `cardReveal 0.6s ease ${i * 80 + 400}ms both`,
                  transition: 'all 0.25s',
                  boxShadow: hov ? `0 0 24px ${f.color}22` : 'none',
                  cursor: 'default',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 20 }}>{f.icon}</span>
                  <span style={{ color: f.color, fontSize: 12, fontWeight: 600, letterSpacing: 0.5 }}>{f.name}</span>
                </div>
                <p style={{ color: '#607590', fontSize: 11.5, lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA BOTTOM ── */}
      <section style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: '60px 40px 80px',
        background: 'linear-gradient(0deg, rgba(6,12,26,0.98) 0%, rgba(4,8,16,0.6) 100%)',
        borderTop: '1px solid rgba(41,128,185,0.08)',
      }}>
        <div style={{ color: '#2a3d52', fontSize: 10, letterSpacing: 5, marginBottom: 20 }}>EXPLORAR AHORA</div>
        <p style={{ color: '#3d6080', fontSize: 13, marginBottom: 30, letterSpacing: 1 }}>
          Navega el árbol interactivo — haz click para expandir, hover para detalles
        </p>
        <button
          onClick={onGoTree}
          style={{
            background: 'linear-gradient(135deg, rgba(231,76,60,0.25), rgba(231,76,60,0.12))',
            border: '1.5px solid rgba(231,76,60,0.5)', borderRadius: 10,
            color: '#ff9090', padding: '13px 42px', fontSize: 12,
            fontFamily: 'Oxanium, monospace', fontWeight: 700, letterSpacing: 2.5,
            cursor: 'pointer', transition: 'all 0.25s',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(231,76,60,0.4), rgba(231,76,60,0.2))';
            e.currentTarget.style.boxShadow = '0 0 40px rgba(231,76,60,0.3)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'linear-gradient(135deg, rgba(231,76,60,0.25), rgba(231,76,60,0.12))';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.transform = '';
          }}
        >
          🌿 IR A LA TAXONOMÍA →
        </button>

        {/* Footer */}
        <div style={{ marginTop: 60, color: '#1e2e40', fontSize: 10, letterSpacing: 2 }}>
          INSTITUTO POLITÉCNICO NACIONAL · CENTRO DE INVESTIGACIÓN EN COMPUTACIÓN
        </div>
      </section>
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TREE PAGE — TOOLTIP
// ═══════════════════════════════════════════════════════
function Tooltip({ text, color }) {
  return (
    <div style={{
      position: 'absolute', bottom: 'calc(100% + 10px)', left: '50%',
      transform: 'translateX(-50%)', zIndex: 300, width: 220, pointerEvents: 'none',
      background: '#050c18', border: `1px solid ${color}44`,
      borderRadius: 8, padding: '10px 12px', fontSize: 11, lineHeight: 1.6,
      color: '#a0b8d0', boxShadow: `0 0 20px ${color}30, 0 8px 30px rgba(0,0,0,0.8)`,
      animation: 'tooltipIn 0.15s ease',
    }}>
      <div style={{ borderBottom: `1px solid ${color}30`, marginBottom: 6, paddingBottom: 6,
        color, fontSize: 10, letterSpacing: 1, fontWeight: 600 }}>INFO</div>
      {text}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TREE PAGE — NODE BOX
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
      {hovered && (
        <div style={{
          position: 'absolute', inset: -4, borderRadius: 14,
          border: `1px solid ${glow}`, animation: 'ringPulse 1s ease infinite',
          pointerEvents: 'none', zIndex: 1,
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
        <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)', borderRadius: 1 }} />
        <div style={{ fontSize: depth === 0 ? 13.5 : 11, fontWeight: depth === 0 ? 700 : 500,
          lineHeight: 1.4, whiteSpace: 'pre-line', color: '#ecf0f1', letterSpacing: 0.3 }}>
          {node.label}
        </div>
        <div style={{ color: text, fontSize: 8.5, marginTop: 5, letterSpacing: 1.5, fontWeight: 600, opacity: 0.85 }}>
          {isLeaf ? '↗ WIKIPEDIA' : isExpanded ? '▾ COLAPSAR' : '▸ EXPANDIR'}
        </div>
      </div>
      {hovered && node.desc && <Tooltip text={node.desc} color={glow} />}
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
// TREE PAGE — TREE NODE
// ═══════════════════════════════════════════════════════
function TreeNode({ node, depth = 0, nodeRefs, onToggle, expanded, sibIdx = 0 }) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expanded[node.id] !== false;
  const isLeaf = !hasChildren;
  const setRef = useCallback(el => { if (el) nodeRefs.current[node.id] = el; }, [node.id, nodeRefs]);

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <NodeBox node={node} depth={depth} nodeRef={setRef} onToggle={onToggle}
        isLeaf={isLeaf} isExpanded={isExpanded} sibIdx={sibIdx} />
      {hasChildren && isExpanded && (
        <div style={{ marginLeft: 46, display: 'flex', flexDirection: 'column', gap: 14, animation: 'fadeIn 0.3s ease' }}>
          {node.children.map((child, i) => (
            <TreeNode key={child.id} node={child} depth={depth + 1}
              nodeRefs={nodeRefs} onToggle={onToggle} expanded={expanded} sibIdx={i} />
          ))}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════
// TREE PAGE — SVG CONNECTORS
// ═══════════════════════════════════════════════════════
function ConnectorLines({ nodeRefs, expanded, containerRef }) {
  const [paths, setPaths] = useState([]);
  const [svgSize, setSvgSize] = useState({ w: 800, h: 600 });

  const compute = useCallback(() => {
    if (!containerRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const newPaths = [];

    function walk(node, depth) {
      if (!node.children || expanded[node.id] === false || node.children.length === 0) return;
      const pe = nodeRefs.current[node.id]; if (!pe) return;
      const pr = pe.getBoundingClientRect();
      node.children.forEach(child => {
        const ce = nodeRefs.current[child.id]; if (!ce) return;
        const ch = ce.getBoundingClientRect();
        const x1 = pr.right - cr.left, y1 = pr.top + pr.height / 2 - cr.top;
        const x2 = ch.left - cr.left, y2 = ch.top + ch.height / 2 - cr.top;
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

  useState(() => { const t = setTimeout(compute, 80); return () => clearTimeout(t); });
  return (
    <svg style={{ position: 'absolute', top: 0, left: 0, width: svgSize.w, height: svgSize.h, pointerEvents: 'none', overflow: 'visible', zIndex: 0 }}>
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
          <path d={p.d} fill="none" stroke="#fff" strokeWidth="0.5" strokeOpacity="0.08" />
        </g>
      ))}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════
// TREE PAGE — LEGEND
// ═══════════════════════════════════════════════════════
function Legend() {
  const levels = ['Raíz', 'Categoría', 'Subcategoría', 'Familia', 'Método', 'Variante'];
  return (
    <div style={{
      position: 'fixed', bottom: 24, right: 24, zIndex: 200,
      background: 'rgba(4,8,18,0.92)', border: '1px solid #0d1e38',
      borderRadius: 12, padding: '14px 18px', backdropFilter: 'blur(10px)',
    }}>
      <div style={{ color: '#3d5a80', fontSize: 9, letterSpacing: 2, marginBottom: 10, fontWeight: 600 }}>PROFUNDIDAD</div>
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
// TREE PAGE
// ═══════════════════════════════════════════════════════
function TreePage() {
  const [expanded, setExpanded] = useState({});
  const nodeRefs = useRef({});
  const containerRef = useRef(null);
  const toggle = useCallback((id) => setExpanded(prev => ({ ...prev, [id]: prev[id] === false })), []);

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#040810', fontFamily: 'Oxanium, monospace', paddingTop: 72 }}>
      <BgGrid /><Scanline /><Particles />

      {/* Page header */}
      <div style={{
        position: 'relative', zIndex: 10, textAlign: 'center',
        padding: '44px 40px 36px',
        background: 'linear-gradient(180deg, rgba(6,12,26,0.98) 0%, rgba(4,8,16,0.7) 100%)',
        borderBottom: '1px solid rgba(41,128,185,0.12)',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, #2980b9, #e74c3c, #27ae60, transparent)',
          backgroundSize: '200% 100%', animation: 'borderSpin 4s linear infinite' }} />
        <div style={{ color: '#e74c3c', fontSize: 10, letterSpacing: 7, marginBottom: 12, fontWeight: 600, opacity: 0.9 }}>
          ◆ TAXONOMÍA INTERACTIVA ◆
        </div>
        <h1 style={{ color: '#f0f4f8', fontSize: 34, fontWeight: 300, letterSpacing: 4, margin: 0, animation: 'headerGlow 4s ease-in-out infinite' }}>
          Algoritmos de Optimización
        </h1>
        <p style={{ color: '#3d6080', fontSize: 11.5, marginTop: 14, letterSpacing: 2, fontWeight: 400 }}>
          HAGA CLICK PARA EXPANDIR · HOVER PARA DESCRIPCIÓN · ↗ PARA WIKIPEDIA
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 20, color: '#2a3d52', fontSize: 10, letterSpacing: 1 }}>
          <span>📌 6 niveles de profundidad</span>
          <span>🌿 23 algoritmos</span>
          <span>🔗 Fuentes en Wikipedia</span>
        </div>
      </div>

      {/* Tree */}
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

// ═══════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [page, setPage] = useState('home');
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <TopBar onNav={setPage} currentPage={page} />
      {page === 'home' ? <HomePage onGoTree={() => setPage('tree')} /> : <TreePage />}
    </>
  );
}

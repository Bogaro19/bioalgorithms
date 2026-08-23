import { useState, useRef } from "react";
import { DC } from "../data/taxonomyData.js";

export function BgGrid() {
  return <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(41,128,185,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(41,128,185,.04) 1px,transparent 1px)`, backgroundSize: "48px 48px" }} />;
}

export function Scanline() {
  return null;
}

export function Particles() {
  const pts = useRef(Array.from({ length: 28 }, (_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, size: Math.random() * 2 + .5, dur: Math.random() * 15 + 10, delay: Math.random() * 10, color: DC[i % DC.length].glow }))).current;
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {pts.map(p => <div key={p.id} style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: p.color, opacity: .4, animation: `float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`, boxShadow: `0 0 ${p.size * 3}px ${p.color}` }} />)}
    </div>
  );
}

export function TopBar({ onNav, cur, theme, onToggleTheme, searchQuery, setSearchQuery, matchCount, activeMatchIndex, onNextMatch, onPrevMatch }) {
  const [isFocused, setIsFocused] = useState(false);

  // Atajos de teclado (Enter para saltar, Esc para limpiar)
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setSearchQuery("");
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (e.shiftKey) onPrevMatch(); // Shift + Enter va hacia atrás
      else onNextMatch();            // Enter va hacia adelante
    }
  };

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, height: 76,
      background: "var(--bg-surface)", borderBottom: "1px solid var(--border-color)",
      backdropFilter: "blur(12px)", display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 40px", transition: "all 0.3s ease", boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 24, zIndex: 2, flex: 1 }}>
        <img src="/ipn-logo.png" alt="IPN" onClick={() => window.open("https://www.ipn.mx", "_blank")} style={{ height: 46, cursor: "pointer", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }} />
        <div style={{ width: 1, height: 32, backgroundColor: "var(--border-color)" }} />
        <img src="/cic-logo.png" alt="CIC" onClick={() => window.open("https://www.cic.ipn.mx", "_blank")} style={{ height: 40, cursor: "pointer", filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.15))" }} />
      </div>

      <nav style={{ display: "flex", gap: 40, zIndex: 1, flex: 1, justifyContent: "center" }}>
        <button onClick={() => onNav("home")} style={{ background: "transparent", border: "none", padding: "0 0 6px 0", color: cur === "home" ? "var(--color-category)" : "var(--text-muted)", fontSize: 14, fontWeight: cur === "home" ? 700 : 500, letterSpacing: 1, cursor: "pointer", transition: "all 0.2s ease", borderBottom: cur === "home" ? "2px solid var(--color-category)" : "2px solid transparent" }}>INICIO</button>
        <button onClick={() => onNav("tree")} style={{ background: "transparent", border: "none", padding: "0 0 6px 0", color: cur === "tree" ? "var(--color-category)" : "var(--text-muted)", fontSize: 14, fontWeight: cur === "tree" ? 700 : 500, letterSpacing: 1, cursor: "pointer", transition: "all 0.2s ease", borderBottom: cur === "tree" ? "2px solid var(--color-category)" : "2px solid transparent" }}>TAXONOMÍA</button>
      </nav>

      <div style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 2, flex: 1, justifyContent: "flex-end" }}>
        
        {/* Barra de Búsqueda Avanzada */}
        <div style={{ 
          opacity: cur === "tree" ? 1 : 0, pointerEvents: cur === "tree" ? "auto" : "none", 
          transition: "all 0.3s ease", display: "flex", alignItems: "center", background: "var(--bg-primary)", 
          border: `1px solid ${isFocused || searchQuery ? "var(--color-category)" : "var(--border-color)"}`, 
          padding: "6px 14px", borderRadius: 20, boxShadow: isFocused ? "0 0 0 3px rgba(2, 132, 199, 0.18)" : "none"
        }}>
          <span style={{ fontSize: 12, marginRight: 8, color: "var(--text-muted)" }}>🔍</span>
          <input 
            type="text" placeholder="Buscar algoritmo..." value={searchQuery}
            onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown} onChange={(e) => setSearchQuery(e.target.value)}
            style={{ border: "none", background: "transparent", outline: "none", color: "var(--text-primary)", fontSize: 13, fontFamily: "Inter, sans-serif", width: 170 }}
          />

          {/* Navegador de Resultados (Flechas y Contador) */}
          {searchQuery && matchCount > 0 && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 8, paddingLeft: 12, borderLeft: "1px solid var(--border-color)" }}>
              <span style={{ fontSize: 11, color: "var(--text-primary)", fontWeight: 700, fontFamily: "Oxanium, monospace" }}>
                {activeMatchIndex + 1} / {matchCount}
              </span>
              <button onClick={onPrevMatch} title="Anterior (Shift+Enter)" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", color: "var(--text-primary)", borderRadius: 4, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="var(--border-color)"} onMouseLeave={e=>e.currentTarget.style.background="var(--bg-surface)"}>↑</button>
              <button onClick={onNextMatch} title="Siguiente (Enter)" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)", color: "var(--text-primary)", borderRadius: 4, width: 22, height: 22, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s" }} onMouseEnter={e=>e.currentTarget.style.background="var(--border-color)"} onMouseLeave={e=>e.currentTarget.style.background="var(--bg-surface)"}>↓</button>
            </div>
          )}

          {/* Botón Esc (Limpiar) */}
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} title="Limpiar (Esc)" style={{ background: "var(--border-color)", border: "none", borderRadius: "50%", width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: 10, color: "var(--text-primary)", marginLeft: 10, transition: "transform 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>✕</button>
          )}
        </div>

        <button onClick={onToggleTheme} title="Cambiar Tema" style={{ background: "transparent", border: "1px solid var(--border-color)", color: "var(--text-primary)", width: 44, height: 44, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "all 0.2s ease", fontSize: 18 }} onMouseEnter={e => { e.currentTarget.style.background = "var(--bg-surface-hover)"; e.currentTarget.style.transform = "scale(1.05)"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.transform = "scale(1)"; }}>{theme === "dark" ? "☀️" : "🌙"}</button>
      </div>
    </header>
  );
}
// src/components/GifViewerModal.jsx
import { useState } from "react";

export default function GifViewerModal({ node, onClose }) {
  const [activeIdx, setActiveIdx] = useState(0);
  if (!node) return null;

  const hasMultiple = node.gifs && node.gifs.length > 0;
  const currentGif  = hasMultiple ? node.gifs[activeIdx] : null;
  const gifSrc      = hasMultiple ? currentGif.src : node.gif;

  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:9999, display:"flex", alignItems:"center",
        justifyContent:"center", background:"rgba(0,0,0,0.78)", backdropFilter:"blur(8px)",
        animation:"fadeIn 0.2s ease" }}
      onClick={onClose}
    >
      <div
        style={{ background:"var(--bg-surface)", padding:"28px 32px", borderRadius:20,
          maxWidth:720, width:"92%", border:"1px solid var(--border-color)", textAlign:"center",
          position:"relative", boxShadow:"0 25px 60px -12px rgba(0,0,0,0.7)" }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button onClick={onClose} style={{ position:"absolute", top:14, right:18,
          background:"transparent", border:"none", fontSize:22, color:"var(--text-muted)",
          cursor:"pointer", transition:"color .2s" }}
          onMouseEnter={e=>e.currentTarget.style.color="var(--text-primary)"}
          onMouseLeave={e=>e.currentTarget.style.color="var(--text-muted)"}>✖</button>

        <h2 style={{ color:"var(--text-primary)", marginTop:0, marginBottom:6,
          fontSize:20, fontWeight:700 }}>{node.label.replace('\n',' ')}</h2>
        <p style={{ color:"var(--text-muted)", fontSize:13, marginBottom:hasMultiple ? 20 : 18 }}>
          {node.desc}
        </p>

        {/* Benchmark tabs */}
        {hasMultiple && (
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:18 }}>
            {node.gifs.map((g, i) => (
              <button key={i} onClick={()=>setActiveIdx(i)} style={{
                padding:"5px 14px", borderRadius:20, fontSize:11, fontWeight:700,
                fontFamily:"Oxanium, monospace", cursor:"pointer", transition:"all .2s",
                background: i===activeIdx ? "var(--text-primary)" : "var(--bg-primary)",
                color:       i===activeIdx ? "var(--bg-primary)"   : "var(--text-muted)",
                border:      i===activeIdx ? "1px solid var(--text-primary)"
                                           : "1px solid var(--border-color)",
              }}>{g.benchmark}</button>
            ))}
          </div>
        )}

        {/* GIF display */}
        <div style={{ borderRadius:12, overflow:"hidden", border:"1px solid var(--border-color)",
          background:"var(--bg-primary)", display:"flex", justifyContent:"center",
          alignItems:"center", minHeight:300 }}>
          {gifSrc ? (
            <img src={gifSrc} alt={`Animación de ${node.label}`}
              style={{ width:"100%", height:"auto", display:"block" }} />
          ) : (
            <div style={{ padding:40, color:"var(--text-muted)", fontSize:14 }}>
              Animación no disponible
            </div>
          )}
        </div>

        {/* Benchmark label */}
        {hasMultiple && currentGif && (
          <div style={{ marginTop:12, fontSize:11, color:"var(--text-muted)",
            fontFamily:"Oxanium, monospace", letterSpacing:1 }}>
            FUNCIÓN BENCHMARK: <strong style={{ color:"var(--text-primary)" }}>
              {currentGif.benchmark}
            </strong>
            &nbsp;·&nbsp;{activeIdx+1} / {node.gifs.length}
          </div>
        )}
      </div>
    </div>
  );
}

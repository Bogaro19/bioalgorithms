// src/components/GifViewerModal.jsx

export default function GifViewerModal({ node, onClose }) {
  if (!node) return null;

  return (
    <div 
      style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)", animation: "fadeIn 0.2s ease" }} 
      onClick={onClose}
    >
      <div 
        style={{ background: "var(--bg-surface)", padding: "30px 40px", borderRadius: 20, maxWidth: 650, width: "90%", border: "1px solid var(--border-color)", textAlign: "center", position: "relative", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }} 
        onClick={e => e.stopPropagation()} // Evita que se cierre al hacer clic dentro de la tarjeta
      >
        <button 
          onClick={onClose} 
          style={{ position: "absolute", top: 16, right: 20, background: "transparent", border: "none", fontSize: 24, color: "var(--text-muted)", cursor: "pointer", transition: "color 0.2s" }}
          onMouseEnter={e => e.currentTarget.style.color = "var(--text-primary)"}
          onMouseLeave={e => e.currentTarget.style.color = "var(--text-muted)"}
        >
          ✖
        </button>
        
        <h2 style={{ color: "var(--text-primary)", marginTop: 0, fontSize: 22, fontWeight: 700 }}>
          {node.label.replace('\n', ' ')}
        </h2>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 24 }}>
          {node.desc}
        </p>
        
        <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--border-color)", background: "var(--bg-primary)", display: "flex", justifyContent: "center", alignItems: "center", minHeight: 300 }}>
          {/* Aquí se inyecta el GIF */}
          <img 
            src={node.gif} 
            alt={`Animación de ${node.label}`} 
            style={{ width: "100%", height: "auto", display: "block" }} 
          />
        </div>
      </div>
    </div>
  );
}
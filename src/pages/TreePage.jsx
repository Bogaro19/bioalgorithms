import { useState, useRef, useCallback, useEffect } from "react";
import { TREE, getLevelColor } from "../data/taxonomyData.js";
import { BgGrid, Scanline } from "../components/SharedUI.jsx";

function SidebarInspector({ activeNode, isPinned, onOpenGif }) {
  // (Mismo código exacto que ya tenías para SidebarInspector en el paso anterior)
  return (
    <aside style={{ width: 480, height: "calc(100vh - 76px)", position: "fixed", top: 76, right: 0, zIndex: 100, background: "var(--bg-surface)", borderLeft: "1px solid var(--border-color)", padding: "40px 36px", boxShadow: "-10px 0 40px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", overflowY: "auto" }}>
      {activeNode ? (
        <div style={{ animation: "fadeIn 0.25s ease-out", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ width: 12, height: 12, borderRadius: "50%", background: isPinned ? "#e74c3c" : getLevelColor(activeNode.depth || 0), boxShadow: isPinned ? "0 0 12px rgba(231,76,60,0.6)" : "none" }}></span>
            <span style={{ fontSize: 12, fontWeight: 800, color: isPinned ? "#e74c3c" : getLevelColor(activeNode.depth || 0), letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "Oxanium, monospace" }}>{isPinned ? "NODO FIJADO EN INSPECCIÓN" : "INSPECCIÓN EN TIEMPO REAL"}</span>
          </div>
          <h3 style={{ margin: "0 0 20px 0", fontSize: 28, fontWeight: 800, color: "var(--text-primary)", lineHeight: 1.2, letterSpacing: -0.5 }}>{activeNode.label.replace('\n', ' ')}</h3>
          <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
            <div style={{ flex: 1, background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "10px 14px" }}><div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>ESTADO SIMULADOR</div><div style={{ fontSize: 13, color: activeNode.gif ? "#27ae60" : "var(--text-primary)", fontWeight: 600 }}>{activeNode.gif ? "● Animación Lista" : "○ No disponible"}</div></div>
            <div style={{ flex: 1, background: "var(--bg-primary)", border: "1px solid var(--border-color)", borderRadius: 8, padding: "10px 14px" }}><div style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>NIVEL JERÁRQUICO</div><div style={{ fontSize: 13, color: "var(--text-primary)", fontWeight: 600 }}>Lvl {activeNode.depth + 1} ({activeNode.children ? "Categoría" : "Hoja"})</div></div>
          </div>
          <div style={{ marginBottom: 32 }}><div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)", letterSpacing: 1, marginBottom: 8, fontFamily: "Oxanium, monospace", borderBottom: "1px solid var(--border-color)", paddingBottom: 8 }}>DESCRIPCIÓN TEÓRICA</div><p style={{ margin: 0, fontSize: 15, lineHeight: 1.7, color: "var(--text-primary)" }}>{activeNode.desc}</p></div>
          {activeNode.useCases && (<div style={{ background: "rgba(39, 174, 96, 0.05)", border: "1px solid rgba(39, 174, 96, 0.3)", borderRadius: 12, padding: "20px", marginBottom: 32 }}><div style={{ color: "#27ae60", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 8, fontFamily: "Oxanium, monospace" }}>APLICACIÓN EN LA INDUSTRIA</div><p style={{ margin: 0, fontSize: 14, color: "var(--text-primary)", lineHeight: 1.7 }}>{activeNode.useCases}</p></div>)}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "auto" }}>
            {activeNode.gif && (<button onClick={() => onOpenGif(activeNode)} style={{ width: "100%", background: "#f39c12", color: "#fff", border: "none", borderRadius: 10, padding: "16px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 6px 20px rgba(243, 156, 18, 0.25)" }} onMouseEnter={e => e.currentTarget.style.transform = "translateY(-2px)"} onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>▶ Reproducir Animación de Convergencia</button>)}
            {activeNode.url && (<button onClick={() => window.open(activeNode.url, "_blank")} style={{ width: "100%", background: "var(--bg-primary)", border: "1px solid var(--border-color)", color: "var(--text-primary)", borderRadius: 10, padding: "16px", fontSize: 14, fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, transition: "all 0.2s" }} onMouseEnter={e => { e.currentTarget.style.border = "1px solid var(--text-primary)" }} onMouseLeave={e => { e.currentTarget.style.border = "1px solid var(--border-color)" }}>↗ Consultar Literatura Científica</button>)}
            {isPinned && (<div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 12 }}>Haz clic en el área cuadriculada para soltar este nodo.</div>)}
          </div>
        </div>
      ) : (
        <div style={{ animation: "fadeIn 0.25s ease-out", display: "flex", flexDirection: "column", height: "100%" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--color-category)", letterSpacing: 1.5, marginBottom: 16, fontFamily: "Oxanium, monospace" }}>PANEL DE CONTROL</div><h3 style={{ margin: "0 0 20px 0", fontSize: 26, fontWeight: 800, color: "var(--text-primary)", letterSpacing: -0.5 }}>Navegación del Árbol</h3><p style={{ fontSize: 15, color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 40 }}>Utiliza este panel para revisar a detalle la teoría y las aplicaciones prácticas de las metaheurísticas estudiadas.<br/><br/><strong>Pasa el cursor</strong> para inspección rápida o <strong>Haz clic</strong> en un nodo para fijarlo en pantalla.</p>
          <div style={{ background: "var(--bg-primary)", borderRadius: 12, padding: 24, border: "1px solid var(--border-color)" }}><div style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)", letterSpacing: 1, marginBottom: 20, fontFamily: "Oxanium, monospace" }}>CÓDIGO DE COLORES (NIVELES)</div><div style={{ display: "flex", flexDirection: "column", gap: 16 }}><div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--text-primary)" }}><span style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--color-root)" }}></span><strong>Nivel 1:</strong> Raíz General</div><div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--text-primary)" }}><span style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--color-category)" }}></span><strong>Nivel 2:</strong> Clase</div><div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--text-primary)" }}><span style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--color-subcategory)" }}></span><strong>Nivel 3:</strong> Entorno Biológico</div><div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--text-primary)" }}><span style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--color-family)" }}></span><strong>Nivel 4:</strong> Subfamilia de Comportamiento</div><div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--text-primary)" }}><span style={{ width: 14, height: 14, borderRadius: "50%", background: "var(--color-method)" }}></span><strong>Nivel 5:</strong> Algoritmo Específico</div></div></div>
          <div style={{ marginTop: "auto", borderTop: "1px solid var(--border-color)", paddingTop: 20, fontSize: 12, color: "var(--text-muted)", textAlign: "center" }}>ESCOM · CIC · Instituto Politécnico Nacional</div>
        </div>
      )}
    </aside>
  );
}

function NodeBox({ node, depth, nodeRef, onToggle, isLeaf, isExpanded, isDimmed, onHover, onSelect, isSelected, isActiveSearch }) {
  const hasGif = !!node.gif; 
  const borderColor = isActiveSearch ? "#f39c12" : (isSelected ? "var(--text-primary)" : getLevelColor(depth));
  
  const handleClick = (e) => { 
    e.stopPropagation(); 
    onSelect({ ...node, depth }); 
    if (!isLeaf) onToggle(node.id); 
  };

  return (
    <div ref={nodeRef} onClick={handleClick} onMouseEnter={() => onHover({ ...node, depth })} onMouseLeave={() => onHover(null)}
      style={{ 
        position: "relative", background: "var(--bg-surface)", 
        border: `2px solid ${borderColor}`, borderRadius: "14px", padding: "14px 20px", 
        minWidth: 170, maxWidth: 220, cursor: "pointer", color: "var(--text-primary)", textAlign: "center", 
        transition: "all .2s ease", 
        boxShadow: isActiveSearch ? "0 0 0 6px rgba(243, 156, 18, 0.25)" : (isSelected ? "0 0 0 4px rgba(150,150,150,0.15)" : "0 4px 12px rgba(0,0,0,0.05)"), 
        userSelect: "none", zIndex: isSelected || isActiveSearch ? 10 : 2, 
        opacity: isDimmed ? 0.15 : 1, filter: isDimmed ? "grayscale(100%)" : "none",
        transform: isSelected || isActiveSearch ? "translateY(-4px)" : "none"
      }}
    >
      {hasGif && (<span style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#f39c12", color: "#fff", borderRadius: 4, padding: "3px 10px", fontSize: 9, fontWeight: 800, letterSpacing: 1 }}>▶ ANIMACIÓN</span>)}
      <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, whiteSpace: "pre-line" }}>{node.label}</div>
      <div style={{ fontSize: 10, marginTop: 10, color: isActiveSearch ? "#f39c12" : (isSelected ? "var(--text-primary)" : "var(--text-muted)"), fontWeight: 800, letterSpacing: 0.5 }}>
        {isActiveSearch ? "RESULTADO" : isSelected ? "FIJADO" : isLeaf ? "INSPECCIONAR" : isExpanded ? "▾ COLAPSAR" : "▸ EXPANDIR"}
      </div>
    </div>
  );
}

function TreeNode({ node, depth = 0, nodeRefs, onToggle, expanded, matchedNodes, isSearching, onHover, onSelect, selectedNode, activeSearchId }) {
  const hasChildren = node.children?.length > 0;
  const isExpanded = expanded[node.id] !== false;
  const isLeaf = !hasChildren;
  const isDimmed = isSearching && !matchedNodes.has(node.id);
  const isSelected = selectedNode?.id === node.id;
  const isActiveSearch = activeSearchId === node.id;
  
  const setRef = useCallback(el => { if (el) nodeRefs.current[node.id] = el; }, [node.id, nodeRefs]);

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <NodeBox node={node} depth={depth} nodeRef={setRef} onToggle={onToggle} isLeaf={isLeaf} isExpanded={isExpanded} isDimmed={isDimmed} onHover={onHover} onSelect={onSelect} isSelected={isSelected} isActiveSearch={isActiveSearch} />
      {hasChildren && isExpanded && (
        <div style={{ marginLeft: 140, display: "flex", flexDirection: "column", gap: 24, animation: "fadeIn 0.3s ease-out forwards" }}>
          {node.children.map(child => (
            <TreeNode key={child.id} node={child} depth={depth + 1} nodeRefs={nodeRefs} onToggle={onToggle} expanded={expanded} matchedNodes={matchedNodes} isSearching={isSearching} onHover={onHover} onSelect={onSelect} selectedNode={selectedNode} activeSearchId={activeSearchId} />
          ))}
        </div>
      )}
    </div>
  );
}

function ConnectorLines({ nodeRefs, expanded, containerRef, isSearching, matchedNodes }) {
  const [paths, setPaths] = useState([]);
  const [svgSize, setSvgSize] = useState({ w: 800, h: 600 });

  const compute = useCallback(() => {
    if (!containerRef.current) return;
    const cr = containerRef.current.getBoundingClientRect();
    const np = [];
    function walk(node, depth) {
      if (!node.children || expanded[node.id] === false || !node.children.length) return;
      const pe = nodeRefs.current[node.id]; if (!pe) return;
      const pr = pe.getBoundingClientRect();
      const px = pr.right - cr.left;
      const py = pr.top + pr.height / 2 - cr.top;
      node.children.forEach(child => {
        const ce = nodeRefs.current[child.id]; if (!ce) return;
        const ch = ce.getBoundingClientRect();
        const cx = ch.left - cr.left;
        const cy = ch.top + ch.height / 2 - cr.top;
        const mx = (px + cx) / 2;
        const pathIsDimmed = isSearching && (!matchedNodes.has(node.id) || !matchedNodes.has(child.id));
        np.push({ id: `${node.id}->${child.id}`, d: `M${px},${py} C${mx},${py} ${mx},${cy} ${cx},${cy}`, color: getLevelColor(depth), isDimmed: pathIsDimmed });
        walk(child, depth + 1);
      });
    }
    walk(TREE, 0);
    setPaths(np);
    setSvgSize({ w: Math.max(cr.width, containerRef.current.scrollWidth), h: Math.max(cr.height, containerRef.current.scrollHeight) });
  }, [nodeRefs, expanded, containerRef, isSearching, matchedNodes]);

  useEffect(() => {
    compute(); let frame; const animate = () => { compute(); frame = requestAnimationFrame(animate); }; animate();
    const t = setTimeout(() => cancelAnimationFrame(frame), 350); return () => { cancelAnimationFrame(frame); clearTimeout(t); };
  }, [expanded, compute]);

  useEffect(() => { window.addEventListener("resize", compute); return () => window.removeEventListener("resize", compute); }, [compute]);

  return (
    <svg style={{ position: "absolute", top: 0, left: 0, width: svgSize.w, height: svgSize.h, pointerEvents: "none", zIndex: 0 }}>
      {paths.map(p => <path key={p.id} d={p.d} fill="none" stroke={p.color} strokeWidth="2.5" strokeOpacity={p.isDimmed ? "0.1" : "0.6"} style={{ transition: "stroke-opacity 0.3s ease" }} />)}
    </svg>
  );
}

export default function TreePage({ onOpenGif, searchQuery = "", setMatchCount, activeMatchIndex }) {
  const [expanded, setExpanded] = useState({});
  const [hoveredNode, setHoveredNode] = useState(null);
  const [selectedNode, setSelectedNode] = useState(null); 
  const nodeRefs = useRef({});
  const containerRef = useRef(null);
  
  const toggle = useCallback(id => setExpanded(prev => ({ ...prev, [id]: prev[id] === false })), []);

  const handleSelect = (node) => {
    if (selectedNode?.id === node.id) setSelectedNode(null); else setSelectedNode(node);
  };

  // Estados del Motor de Búsqueda
  const [matchedNodes, setMatchedNodes] = useState(new Set()); // Para iluminar líneas
  const [exactMatches, setExactMatches] = useState([]);        // Para iterar con Enter
  const isSearching = searchQuery.trim().length > 0;

  useEffect(() => {
    if (!isSearching) { 
      setMatchedNodes(new Set()); 
      setExactMatches([]); 
      setMatchCount(0); 
      return; 
    }

    const q = searchQuery.toLowerCase();
    const exact = [];
    const paths = new Set();
    
    // Función recursiva que busca coincidencias y levanta las rutas
    const searchTree = (node, currentPath) => {
        const pathWithMe = [...currentPath, node.id];
        let isExactMatch = node.label.toLowerCase().includes(q) || node.desc.toLowerCase().includes(q) || (node.useCases && node.useCases.toLowerCase().includes(q));
        
        if (isExactMatch) {
            exact.push(node); // Guardamos el nodo para saltar a él
            pathWithMe.forEach(id => paths.add(id)); // Iluminamos su ruta
        }
        
        if (node.children) {
            node.children.forEach(child => { 
              if (searchTree(child, pathWithMe)) paths.add(node.id); 
            });
        }
        return isExactMatch || paths.has(node.id);
    };
    
    searchTree(TREE, []);
    setExactMatches(exact);
    setMatchedNodes(paths);
    setMatchCount(exact.length);

    // AUTO-EXPANDIR TODAS LAS RAMAS NECESARIAS PARA MOSTRAR LOS RESULTADOS
    if (exact.length > 0) {
      setExpanded(prev => {
        const next = { ...prev };
        paths.forEach(id => { next[id] = true; }); // Fuerza la apertura
        return next;
      });
    }
  }, [searchQuery, isSearching, setMatchCount]);

  // AUTO-SCROLL Y SELECCIÓN CINEMATOGRÁFICA
  useEffect(() => {
    if (exactMatches.length > 0 && exactMatches[activeMatchIndex]) {
      const targetNode = exactMatches[activeMatchIndex];
      const el = nodeRefs.current[targetNode.id];
      
      if (el) {
        // Hace un Scroll suave hasta poner el elemento en el centro de la pantalla
        el.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
        // Fija el nodo automáticamente en el panel de la derecha
        setSelectedNode(targetNode); 
      }
    }
  }, [activeMatchIndex, exactMatches]);

  const activeNode = selectedNode || hoveredNode;
  const isPinned = !!selectedNode && (activeNode?.id === selectedNode.id);
  const activeSearchId = exactMatches.length > 0 ? exactMatches[activeMatchIndex]?.id : null;

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh", paddingTop: 76 }}>
      <BgGrid /><Scanline />
      
      {/* Zona Izquierda: Árbol */}
      <div style={{ flex: 1, overflowX: "auto", overflowY: "auto", position: "relative", display: "flex", flexDirection: "column" }} onClick={() => setSelectedNode(null)}>
        
        <div style={{ 
          position: "sticky", 
          left: 0, 
          width: "calc(100vw - 480px)", 
          boxSizing: "border-box",
          textAlign: "center", 
          marginBottom: 60, 
          marginTop: 50, 
          zIndex: 10, 
          padding: "0 40px" 
        }}>
          <h1 style={{ fontSize: 32, fontWeight: 800, color: "var(--text-primary)", letterSpacing: -0.5, margin: 0 }}>
            Taxonomía de Algoritmos
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: 15, marginTop: 10, margin: 0 }}>
            Utiliza la barra superior para buscar un algoritmo. Presiona <strong>Enter</strong> para viajar entre resultados.
          </p>
        </div>
        
        <div ref={containerRef} style={{ margin: "0 auto", position: "relative", minWidth: "max-content", padding: "0 520px 100px 60px" }}>
          <ConnectorLines nodeRefs={nodeRefs} expanded={expanded} containerRef={containerRef} isSearching={isSearching} matchedNodes={matchedNodes} />
          <TreeNode node={TREE} depth={0} nodeRefs={nodeRefs} onToggle={toggle} expanded={expanded} matchedNodes={matchedNodes} isSearching={isSearching} onHover={setHoveredNode} onSelect={handleSelect} selectedNode={selectedNode} activeSearchId={activeSearchId} />
        </div>
      </div>

      {/* Zona Derecha: Sidebar Inspector Fijo */}
      <SidebarInspector activeNode={activeNode} isPinned={isPinned} onOpenGif={onOpenGif} />
    </div>
  );
}
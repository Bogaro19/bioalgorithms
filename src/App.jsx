import { useState, useEffect } from "react";
import { TopBar } from "./components/SharedUI.jsx";
import HomePage from "./pages/HomePage.jsx";
import TreePage from "./pages/TreePage.jsx";
import AlgorithmPage from "./pages/AlgorithmPage.jsx"; // <-- IMPORTAMOS LA NUEVA PÁGINA
import GifViewerModal from "./components/GifViewerModal.jsx";

const G = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Oxanium:wght@600;700;800&display=swap');
@keyframes fadeIn{from{opacity:0;}to{opacity:1;}}
@keyframes fadeSlideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
@keyframes scanline{0%{top:-5%}100%{top:105%}}
::-webkit-scrollbar{width:7px;height:7px}
::-webkit-scrollbar-track{background:var(--bg-primary)}
::-webkit-scrollbar-thumb{background:var(--bg-surface-hover);border-radius:4px}
`;

export default function App() {
  const [page, setPage] = useState("home");
  const [activeGifNode, setActiveGifNode] = useState(null); 
  const [detailNode, setDetailNode] = useState(null); // <-- NUEVO ESTADO PARA LA PÁGINA DEDICADA
  
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  
  const [searchQuery, setSearchQuery] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => { setActiveMatchIndex(0); }, [searchQuery]);

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));
  const handleNextMatch = () => { if (matchCount > 0) setActiveMatchIndex(p => (p + 1) % matchCount); };
  const handlePrevMatch = () => { if (matchCount > 0) setActiveMatchIndex(p => (p - 1 + matchCount) % matchCount); };

  // Controlador de navegación principal
  const handleNav = (p) => {
    setPage(p);
    setSearchQuery("");
    setDetailNode(null); // Si el usuario usa el menú superior, salimos de la vista detallada
  }

  return (
    <>
      <style>{G}</style>
      <TopBar 
        onNav={handleNav} 
        cur={detailNode ? "algorithm" : page} // Para ocultar el buscador si estamos en la vista detallada
        theme={theme} onToggleTheme={toggleTheme} 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        matchCount={matchCount} activeMatchIndex={activeMatchIndex}
        onNextMatch={handleNextMatch} onPrevMatch={handlePrevMatch}
      />
      
      <div key={detailNode ? "detail" : page} style={{ animation: "fadeSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
        {detailNode ? (
          <AlgorithmPage 
            node={detailNode} 
            onBack={() => setDetailNode(null)} 
            onOpenGif={node => setActiveGifNode(node)} 
          />
        ) : page === "home" ? (
          <HomePage onGoTree={() => setPage("tree")} />
        ) : (
          <TreePage 
            onOpenGif={node => setActiveGifNode(node)} 
            onOpenDetail={node => setDetailNode(node)} // Pasamos la función al árbol
            searchQuery={searchQuery} 
            setMatchCount={setMatchCount}
            activeMatchIndex={activeMatchIndex}
          />
        )}
      </div>
      
      {activeGifNode && <GifViewerModal node={activeGifNode} onClose={() => setActiveGifNode(null)} />}
    </>
  );
}
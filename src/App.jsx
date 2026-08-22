import { useState, useEffect } from "react";
import { TopBar } from "./components/SharedUI.jsx";
import HomePage from "./pages/HomePage.jsx";
import TreePage from "./pages/TreePage.jsx";
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
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");
  
  // Estados para el Motor de Búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const [activeMatchIndex, setActiveMatchIndex] = useState(0);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Resetea el índice al escribir algo nuevo
  useEffect(() => { setActiveMatchIndex(0); }, [searchQuery]);

  const toggleTheme = () => setTheme(prev => (prev === "dark" ? "light" : "dark"));
  
  const handleNextMatch = () => { if (matchCount > 0) setActiveMatchIndex(p => (p + 1) % matchCount); };
  const handlePrevMatch = () => { if (matchCount > 0) setActiveMatchIndex(p => (p - 1 + matchCount) % matchCount); };

  return (
    <>
      <style>{G}</style>
      <TopBar 
        onNav={(p) => { setPage(p); setSearchQuery(""); }} 
        cur={page} theme={theme} onToggleTheme={toggleTheme} 
        searchQuery={searchQuery} setSearchQuery={setSearchQuery}
        matchCount={matchCount} activeMatchIndex={activeMatchIndex}
        onNextMatch={handleNextMatch} onPrevMatch={handlePrevMatch}
      />
      
      <div key={page} style={{ animation: "fadeSlideUp 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)" }}>
        {page === "home" ? (
          <HomePage onGoTree={() => setPage("tree")} />
        ) : (
          <TreePage 
            onOpenGif={node => setActiveGifNode(node)} 
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
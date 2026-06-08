import { useState, useRef, useCallback, useEffect } from "react";
import SimulatorModal from "./SimulatorModal.jsx";

const TREE = {
  id:"root", label:"Algoritmos de\nOptimización",
  url:"https://es.wikipedia.org/wiki/Optimizaci%C3%B3n_(matem%C3%A1tica)",
  desc:"Campo de las matemáticas aplicadas que busca encontrar la mejor solución entre un conjunto de alternativas posibles.",
  children:[
    { id:"deterministas", label:"Algoritmos\nDeterministas", url:"https://es.wikipedia.org/wiki/Algoritmo_determinista", desc:"Producen el mismo resultado dado el mismo punto de inicio. Sin aleatoriedad.",
      children:[
        { id:"directa", label:"Búsqueda\nDirecta", url:"https://en.wikipedia.org/wiki/Direct_search_algorithm", desc:"No utilizan derivadas. Evalúan la función directamente en distintos puntos.",
          children:[
            { id:"colina",   label:"Escalador\nde Colina", url:"https://es.wikipedia.org/wiki/Escalada_(inform%C3%A1tica)",   desc:"Avanza hacia soluciones vecinas de mayor valor. Susceptible a mínimos locales.", children:[] },
            { id:"nelder",   label:"Nelder-Mead",          url:"https://es.wikipedia.org/wiki/M%C3%A9todo_de_Nelder-Mead",  desc:"Método simplex sin derivadas. Popular en optimización de parámetros experimentales.", children:[] },
          ]},
        { id:"indirecta", label:"Búsqueda\nIndirecta", url:"https://en.wikipedia.org/wiki/Gradient_descent", desc:"Utilizan derivadas o gradientes para guiar la búsqueda hacia el óptimo.",
          children:[
            { id:"newton",    label:"Método\nde Newton",      url:"https://es.wikipedia.org/wiki/M%C3%A9todo_de_Newton",    desc:"Usa la Hessiana para convergencia rápida. Muy eficiente cerca del óptimo.", children:[] },
            { id:"gradiente", label:"Gradiente\nDescendente", url:"https://es.wikipedia.org/wiki/Descenso_de_gradiente",    desc:"Sigue la dirección de mayor descenso. Base del entrenamiento de redes neuronales.", children:[] },
          ]},
      ]},
    { id:"estocasticos", label:"Algoritmos\nEstocásticos", url:"https://es.wikipedia.org/wiki/Algoritmo_estoc%C3%A1stico", desc:"Incorporan aleatoriedad. Pueden producir diferentes resultados en cada ejecución.",
      children:[
        { id:"metaheuristicos", label:"Algoritmos\nMetaheurísticos", url:"https://es.wikipedia.org/wiki/Metaheur%C3%ADstica", desc:"Estrategias de alto nivel que guían la búsqueda heurística. Inspirados en la naturaleza.",
          children:[
            { id:"poblacion", label:"Basados en\nPoblación", url:"https://en.wikipedia.org/wiki/Evolutionary_algorithm", desc:"Trabajan con múltiples soluciones simultáneas, favoreciendo la diversidad.",
              children:[
                { id:"evolutivos", label:"Algoritmos\nEvolutivos", url:"https://es.wikipedia.org/wiki/Algoritmo_evolutivo", desc:"Simulan evolución biológica: selección, cruce y mutación de soluciones.",
                  children:[
                    { id:"geneticos",   label:"Algoritmos\nGenéticos",   url:"https://es.wikipedia.org/wiki/Algoritmo_gen%C3%A9tico",        desc:"Cromosomas codificados evolucionan con selección natural, cruce y mutación.", children:[] },
                    { id:"diferencial", label:"Evolución\nDiferencial",  url:"https://es.wikipedia.org/wiki/Evoluci%C3%B3n_diferencial",     desc:"Perturba vectores de solución con diferencias ponderadas. Muy robusto en espacios continuos.", simulator:"de", children:[] },
                    { id:"prog-gen",    label:"Programación\nGenética",  url:"https://es.wikipedia.org/wiki/Programaci%C3%B3n_gen%C3%A9tica",desc:"Evoluciona programas en forma de árbol. Diseño automático de modelos.", children:[] },
                  ]},
                { id:"colectiva", label:"Inteligencia\nColectiva", url:"https://es.wikipedia.org/wiki/Inteligencia_de_enjambre", desc:"Comportamiento emergente de agentes simples interactuando localmente.",
                  children:[
                    { id:"pso", label:"Enjambre de\nPartículas (PSO)", url:"https://es.wikipedia.org/wiki/Optimizaci%C3%B3n_por_enjambre_de_part%C3%ADculas", desc:"Partículas exploran el espacio guiadas por su mejor posición y la del enjambre.", simulator:"pso", children:[] },
                    { id:"abc", label:"Colonia\nde Abejas",    url:"https://en.wikipedia.org/wiki/Artificial_bee_colony_algorithm",         desc:"Imita abejas buscando alimento. Exploradoras, empleadas y observadoras cooperan.", children:[] },
                    { id:"aco", label:"Colonia\nde Hormigas",  url:"https://es.wikipedia.org/wiki/Algoritmo_de_colonia_de_hormigas",        desc:"Simula feromonas de hormigas. Excelente para el problema del Viajante (TSP).", children:[] },
                  ]},
              ]},
            { id:"trayectoria", label:"Basados en\nTrayectoria", url:"https://en.wikipedia.org/wiki/Simulated_annealing", desc:"Parten de una sola solución y la mejoran iterativamente.",
              children:[
                { id:"caminata", label:"Caminata\nAleatoria", url:"https://es.wikipedia.org/wiki/Camino_aleatorio",        desc:"Pasos aleatorios sucesivos. Base teórica de muchos métodos.", children:[] },
                { id:"recocido", label:"Recocido\nSimulado",  url:"https://es.wikipedia.org/wiki/Recocido_simulado",       desc:"Acepta soluciones peores con probabilidad decreciente para escapar mínimos locales.", children:[] },
                { id:"tabu",     label:"Búsqueda\nTabú",      url:"https://es.wikipedia.org/wiki/B%C3%BAsqueda_tab%C3%BA",desc:"Lista tabú que prohíbe movimientos recientes para evitar ciclos.", children:[] },
              ]},
          ]},
        { id:"heuristicos", label:"Algoritmos\nHeurísticos", url:"https://es.wikipedia.org/wiki/Heur%C3%ADstica_(inform%C3%A1tica)", desc:"Reglas prácticas y experiencia. No garantizan el óptimo pero son rápidos.", children:[]},
      ]},
  ],
};

const DC=[
  {bg:"linear-gradient(145deg,#3b0909,#6e1515)",border:"#e74c3c",glow:"#e74c3c",text:"#ff9090",rgb:"231,76,60"},
  {bg:"linear-gradient(145deg,#081d3a,#0d2e5e)",border:"#2980b9",glow:"#2980b9",text:"#79c0ef",rgb:"41,128,185"},
  {bg:"linear-gradient(145deg,#07253a,#0a3656)",border:"#00b4d8",glow:"#00b4d8",text:"#70daf8",rgb:"0,180,216"},
  {bg:"linear-gradient(145deg,#160e3d,#231552)",border:"#9b59b6",glow:"#9b59b6",text:"#c498e8",rgb:"155,89,182"},
  {bg:"linear-gradient(145deg,#092918,#0d3f23)",border:"#27ae60",glow:"#27ae60",text:"#6fdb96",rgb:"39,174,96"},
  {bg:"linear-gradient(145deg,#291d07,#3e2c09)",border:"#f39c12",glow:"#f39c12",text:"#f9c545",rgb:"243,156,18"},
];
const dc=d=>DC[Math.min(d,DC.length-1)];

const G=`
@import url('https://fonts.googleapis.com/css2?family=Oxanium:wght@300;400;500;600;700;800&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body,#root{width:100%;min-height:100vh;margin:0;padding:0;background:#040810;overflow-x:hidden}
@keyframes nodeIn{from{opacity:0;transform:translateX(-18px) scale(.88)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0;transform:translateX(-8px)}to{opacity:1;transform:none}}
@keyframes tooltipIn{from{opacity:0;transform:translateX(-50%) translateY(4px)}to{opacity:1;transform:translateX(-50%)}}
@keyframes ringPulse{0%,100%{opacity:.4;transform:scale(1)}50%{opacity:.8;transform:scale(1.02)}}
@keyframes float{from{transform:translate(0,0)}to{transform:translate(20px,-30px)}}
@keyframes headerGlow{0%,100%{text-shadow:0 0 40px rgba(41,128,185,.4)}50%{text-shadow:0 0 70px rgba(41,128,185,.8)}}
@keyframes scanline{0%{top:-5%}100%{top:105%}}
@keyframes fadeUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:none}}
@keyframes slideDown{from{opacity:0;transform:translateY(-18px)}to{opacity:1;transform:none}}
@keyframes cardReveal{from{opacity:0;transform:translateY(20px) scale(.96)}to{opacity:1;transform:none}}
@keyframes borderSpin{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes logoGlow{0%,100%{filter:drop-shadow(0 0 8px rgba(41,128,185,.3))}50%{filter:drop-shadow(0 0 22px rgba(41,128,185,.75))}}
@keyframes simPulse{0%,100%{box-shadow:0 0 8px rgba(243,156,18,.22)}50%{box-shadow:0 0 20px rgba(243,156,18,.6)}}
::-webkit-scrollbar{width:7px;height:7px}
::-webkit-scrollbar-track{background:#02040a}
::-webkit-scrollbar-thumb{background:#152040;border-radius:4px}
`;

function BgGrid(){return<div style={{position:"fixed",inset:0,zIndex:0,pointerEvents:"none",backgroundImage:`linear-gradient(rgba(41,128,185,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(41,128,185,.04) 1px,transparent 1px)`,backgroundSize:"48px 48px"}}/>;}
function Scanline(){return<div style={{position:"fixed",left:0,right:0,height:"3px",zIndex:0,background:"linear-gradient(transparent,rgba(41,128,185,.08),transparent)",animation:"scanline 8s linear infinite",pointerEvents:"none"}}/>;}
function Particles(){
  const pts=useRef(Array.from({length:28},(_,i)=>({id:i,x:Math.random()*100,y:Math.random()*100,size:Math.random()*2+.5,dur:Math.random()*15+10,delay:Math.random()*10,color:DC[i%DC.length].glow}))).current;
  return(<div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>{pts.map(p=><div key={p.id} style={{position:"absolute",left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,borderRadius:"50%",background:p.color,opacity:.4,animation:`float ${p.dur}s ease-in-out ${p.delay}s infinite alternate`,boxShadow:`0 0 ${p.size*3}px ${p.color}`}}/>)}</div>);
}

function TopBar({onNav,cur}){
  return(
    <div style={{position:"fixed",top:0,left:0,right:0,zIndex:200,height:72,background:"rgba(4,8,18,.97)",borderBottom:"1px solid rgba(41,128,185,.18)",backdropFilter:"blur(16px)",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 28px",animation:"slideDown .5s ease"}}>
      <img src="/ipn-logo.png" alt="IPN" onClick={()=>window.open("https://www.ipn.mx","_blank")} style={{height:52,width:"auto",objectFit:"contain",animation:"logoGlow 4s ease-in-out infinite",cursor:"pointer"}}/>
      <div style={{display:"flex",gap:8}}>
        {[{id:"home",label:"⌂  Inicio"},{id:"tree",label:"🌿  Taxonomía"}].map(item=>(
          <button key={item.id} onClick={()=>onNav(item.id)} style={{background:cur===item.id?"linear-gradient(135deg,rgba(41,128,185,.25),rgba(0,180,216,.15))":"rgba(255,255,255,.03)",border:`1px solid ${cur===item.id?"rgba(41,128,185,.6)":"rgba(41,128,185,.15)"}`,borderRadius:8,color:cur===item.id?"#79c0ef":"#4a6a85",padding:"7px 22px",fontSize:12,fontFamily:"Oxanium,monospace",fontWeight:600,letterSpacing:1.5,cursor:"pointer",transition:"all .25s",boxShadow:cur===item.id?"0 0 14px rgba(41,128,185,.25)":"none"}}>{item.label}</button>
        ))}
      </div>
      <img src="/cic-logo.png" alt="CIC" onClick={()=>window.open("https://www.cic.ipn.mx","_blank")} style={{height:44,width:"auto",objectFit:"contain",animation:"logoGlow 4s ease-in-out 2s infinite",cursor:"pointer"}}/>
    </div>
  );
}

const STATS=[
  {value:"23",label:"Algoritmos",          color:"#2980b9",rgb:"41,128,185", icon:"⚙"},
  {value:"6", label:"Niveles profundidad", color:"#e74c3c",rgb:"231,76,60",  icon:"◈"},
  {value:"2", label:"Simuladores activos", color:"#f39c12",rgb:"243,156,18", icon:"⚡"},
  {value:"4", label:"Funciones benchmark", color:"#27ae60",rgb:"39,174,96",  icon:"∫"},
];

function StatCard({value,label,color,rgb,icon}){
  const[h,sH]=useState(false);
  return(
    <div onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{background:`linear-gradient(145deg,rgba(${rgb},.09),rgba(${rgb},.04))`,border:`1px solid rgba(${rgb},${h?.5:.28})`,borderRadius:14,padding:"26px 20px",textAlign:"center",transition:"all .25s",transform:h?"translateY(-4px)":"none",boxShadow:h?`0 14px 40px rgba(${rgb},.22)`:"none",cursor:"default",position:"relative",overflow:"hidden"}}>
      <div style={{fontSize:28,marginBottom:8}}>{icon}</div>
      <div style={{fontSize:46,fontWeight:800,color,lineHeight:1,textShadow:`0 0 28px rgba(${rgb},.55)`}}>{value}</div>
      <div style={{color:"#607590",fontSize:10.5,letterSpacing:1.5,marginTop:8,fontWeight:500}}>{label.toUpperCase()}</div>
    </div>
  );
}

function SimPromoCard({icon,name,color,rgb,desc,onGoTree}){
  const[h,sH]=useState(false);
  return(
    <div onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} onClick={onGoTree}
      style={{flex:1,background:h?`linear-gradient(145deg,rgba(${rgb},.18),rgba(${rgb},.08))`:`linear-gradient(145deg,rgba(${rgb},.10),rgba(${rgb},.04))`,border:`1.5px solid rgba(${rgb},${h?.8:.4})`,borderRadius:14,padding:"24px 20px",cursor:"pointer",transition:"all .3s",boxShadow:h?`0 0 40px rgba(${rgb},.28)`:"none",animation:"simPulse 3s ease infinite",position:"relative",overflow:"hidden"}}>
      <div style={{position:"absolute",top:10,right:10,background:`rgba(${rgb},.2)`,border:`1px solid rgba(${rgb},.5)`,borderRadius:5,padding:"2px 8px",fontSize:8,color:`rgb(${rgb})`,letterSpacing:2,fontWeight:700}}>⚡ LIVE SIM</div>
      <div style={{fontSize:30,marginBottom:10}}>{icon}</div>
      <div style={{color:`rgb(${rgb})`,fontSize:14,fontWeight:700,marginBottom:8}}>{name}</div>
      <p style={{color:"#607590",fontSize:12,lineHeight:1.7,marginBottom:14}}>{desc}</p>
      <div style={{color:`rgb(${rgb})`,fontSize:9,letterSpacing:2,fontWeight:600}}>🌿 IR A TAXONOMÍA → ABRIR SIMULADOR</div>
    </div>
  );
}

function AboutCard({icon,title,color,rgb,delay,text}){
  const[h,sH]=useState(false);
  return(
    <div onMouseEnter={()=>sH(true)} onMouseLeave={()=>sH(false)} style={{background:`linear-gradient(145deg,rgba(${rgb},.07),rgba(${rgb},.03))`,border:`1px solid rgba(${rgb},${h?.45:.18})`,borderRadius:13,padding:"24px 22px",animation:`cardReveal .7s ease ${delay}ms both`,transition:"all .25s",boxShadow:h?`0 8px 30px rgba(${rgb},.12)`:"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
        <span style={{fontSize:22}}>{icon}</span>
        <span style={{color:`rgb(${rgb})`,fontSize:13,fontWeight:700}}>{title}</span>
      </div>
      <p style={{color:"#7a9ab8",fontSize:12.5,lineHeight:1.8}}>{text}</p>
    </div>
  );
}

function HomePage({onGoTree}){
  return(
    <div style={{width:"100%",minHeight:"100vh",background:"#040810",fontFamily:"Oxanium,monospace",paddingTop:72}}>
      <BgGrid/><Scanline/><Particles/>
      <section style={{position:"relative",zIndex:10,textAlign:"center",padding:"84px 40px 72px",background:"linear-gradient(180deg,rgba(6,12,26,.98),rgba(4,8,16,.65))",borderBottom:"1px solid rgba(41,128,185,.1)"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#2980b9,#e74c3c,#27ae60,#9b59b6,transparent)",backgroundSize:"200% 100%",animation:"borderSpin 4s linear infinite"}}/>
        <div style={{color:"#e74c3c",fontSize:10,letterSpacing:7,marginBottom:16,fontWeight:600}}>◆ PROYECTO DE INVESTIGACIÓN — IPN · CIC ◆</div>
        <h1 style={{color:"#f0f4f8",fontSize:48,fontWeight:300,letterSpacing:3,margin:"0 0 10px",animation:"headerGlow 4s ease-in-out infinite",lineHeight:1.15}}>Algoritmos de Optimización</h1>
        <h2 style={{color:"#2980b9",fontSize:19,fontWeight:400,letterSpacing:4,margin:"0 0 28px",opacity:.85}}>Taxonomía Interactiva + Simuladores EAPack v7.0</h2>
        <p style={{color:"#607590",fontSize:15,maxWidth:700,margin:"0 auto 40px",lineHeight:1.95,animation:"fadeUp .8s ease .3s both"}}>
          Una herramienta visual e interactiva para explorar los principales algoritmos de optimización.
          Incluye <strong style={{color:"#f39c12"}}>simuladores en tiempo real</strong> de PSO y Evolución Diferencial,
          migración completa de EAPack v7.0 Python → React.
        </p>
        <button onClick={onGoTree} style={{background:"linear-gradient(135deg,rgba(41,128,185,.3),rgba(0,180,216,.2))",border:"1.5px solid rgba(41,128,185,.7)",borderRadius:10,color:"#79c0ef",padding:"14px 46px",fontSize:13,fontFamily:"Oxanium,monospace",fontWeight:700,letterSpacing:2,cursor:"pointer",transition:"all .25s",boxShadow:"0 0 28px rgba(41,128,185,.2)",animation:"fadeUp .8s ease .6s both"}}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 55px rgba(41,128,185,.5)";e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="0 0 28px rgba(41,128,185,.2)";e.currentTarget.style.transform="";}}>
          🌿 EXPLORAR TAXONOMÍA →
        </button>
      </section>
      <section style={{position:"relative",zIndex:10,padding:"56px 60px 48px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:18,maxWidth:880,margin:"0 auto"}}>
          {STATS.map((s,i)=><StatCard key={i} {...s}/>)}
        </div>
      </section>
      <div style={{display:"flex",justifyContent:"center",padding:"0 60px"}}><div style={{height:1,width:"100%",maxWidth:840,background:"linear-gradient(90deg,transparent,rgba(243,156,18,.2),transparent)"}}/></div>
      <section style={{position:"relative",zIndex:10,padding:"56px 60px 48px",maxWidth:940,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{color:"#f39c12",fontSize:9,letterSpacing:6,fontWeight:600,marginBottom:10}}>SIMULADORES INTEGRADOS — EAPack v7.0</div>
          <h3 style={{color:"#ecf0f1",fontSize:26,fontWeight:400,letterSpacing:1}}>Algoritmos con Visualización en Vivo</h3>
        </div>
        <div style={{display:"flex",gap:18}}>
          <SimPromoCard icon="🐦" name="Enjambre de Partículas (PSO)" color="#f39c12" rgb="243,156,18"
            desc="Observa cómo las partículas actualizan velocidades y posiciones, convergiendo al óptimo global. Parámetros w, c1, c2 ajustables en tiempo real."
            onGoTree={onGoTree}/>
          <SimPromoCard icon="🧬" name="Evolución Diferencial (DE)" color="#27ae60" rgb="39,174,96"
            desc="Visualiza la evolución generacional: mutación diferencial F·(x_r2 - x_r3), crossover CR y selección greedy competiendo por soluciones mejores."
            onGoTree={onGoTree}/>
        </div>
      </section>
      <div style={{display:"flex",justifyContent:"center",padding:"0 60px"}}><div style={{height:1,width:"100%",maxWidth:840,background:"linear-gradient(90deg,transparent,rgba(41,128,185,.18),transparent)"}}/></div>
      <section style={{position:"relative",zIndex:10,padding:"56px 60px 48px",maxWidth:940,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:40}}>
          <div style={{color:"#2980b9",fontSize:9,letterSpacing:6,fontWeight:600,marginBottom:10}}>SOBRE EL PROYECTO</div>
          <h3 style={{color:"#ecf0f1",fontSize:26,fontWeight:400,letterSpacing:1}}>Propósito y Alcance</h3>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
          <AboutCard icon="🎯" title="Objetivo Principal" color="#e74c3c" rgb="231,76,60" delay={0} text="Proporcionar una visión estructurada de los algoritmos de optimización, facilitando su comprensión, clasificación y selección para problemas de IA e investigación de operaciones."/>
          <AboutCard icon="🔬" title="Enfoque Académico" color="#2980b9" rgb="41,128,185" delay={100} text="Desarrollado en el CIC del IPN. La migración de EAPack v7.0 Python→React preserva la lógica completa de los algoritmos y la fidelidad numérica con el original."/>
          <AboutCard icon="⚡" title="EAPack v7.0 Migrado" color="#f39c12" rgb="243,156,18" delay={200} text="PSO y DE portados a JS puro, benchmarks Sphere/Rastrigin/Ackley/Rosenbrock, visualización Plotly, parámetros idénticos al original Python, exportación CSV."/>
          <AboutCard icon="🌐" title="Recursos Vinculados" color="#9b59b6" rgb="155,89,182" delay={300} text="Cada nodo enlaza a Wikipedia. Los simuladores replican fielmente app.py + eapack/, incluyendo semilla, grid_points, emit_every, log X/Y y descarga de convergencia."/>
        </div>
      </section>
      <section style={{position:"relative",zIndex:10,textAlign:"center",padding:"56px 40px 72px",background:"linear-gradient(0deg,rgba(6,12,26,.98),rgba(4,8,16,.6))",borderTop:"1px solid rgba(41,128,185,.08)"}}>
        <button onClick={onGoTree} style={{background:"linear-gradient(135deg,rgba(231,76,60,.22),rgba(231,76,60,.1))",border:"1.5px solid rgba(231,76,60,.48)",borderRadius:10,color:"#ff9090",padding:"13px 42px",fontSize:12,fontFamily:"Oxanium,monospace",fontWeight:700,letterSpacing:2.5,cursor:"pointer",transition:"all .25s"}}
          onMouseEnter={e=>{e.currentTarget.style.boxShadow="0 0 40px rgba(231,76,60,.3)";e.currentTarget.style.transform="translateY(-2px)";}}
          onMouseLeave={e=>{e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="";}}>
          🌿 IR A LA TAXONOMÍA →
        </button>
        <div style={{marginTop:56,color:"#1a2a38",fontSize:9,letterSpacing:3}}>INSTITUTO POLITÉCNICO NACIONAL · CENTRO DE INVESTIGACIÓN EN COMPUTACIÓN</div>
      </section>
    </div>
  );
}

function Tooltip({text,color}){
  return(<div style={{position:"absolute",bottom:"calc(100% + 10px)",left:"50%",transform:"translateX(-50%)",zIndex:400,width:222,pointerEvents:"none",background:"#050c18",border:`1px solid ${color}44`,borderRadius:8,padding:"10px 12px",fontSize:11,lineHeight:1.65,color:"#a0b8d0",boxShadow:`0 0 20px ${color}30,0 8px 30px rgba(0,0,0,.8)`,animation:"tooltipIn .15s ease"}}>
    <div style={{borderBottom:`1px solid ${color}30`,marginBottom:6,paddingBottom:6,color,fontSize:9,letterSpacing:1.5,fontWeight:700}}>INFO</div>
    {text}
  </div>);
}

function NodeBox({node,depth,nodeRef,onToggle,isLeaf,isExpanded,sibIdx,onSim}){
  const {bg,border,glow,text,rgb}=dc(depth);
  const [hov,sHov]=useState(false);
  const hasSim=!!node.simulator;
  const simRgb=node.simulator==="pso"?"243,156,18":"39,174,96";
  const simCol=node.simulator==="pso"?"#f39c12":"#27ae60";
  const delay=depth*100+sibIdx*65;
  const handleClick=()=>{ if(hasSim) onSim(node.simulator); else if(isLeaf) window.open(node.url,"_blank"); else onToggle(node.id); };
  return(
    <div style={{position:"relative",flexShrink:0}} onMouseEnter={()=>sHov(true)} onMouseLeave={()=>sHov(false)}>
      {hov&&<div style={{position:"absolute",inset:-4,borderRadius:14,border:`1px solid ${hasSim?simCol:glow}`,animation:"ringPulse 1s ease infinite",pointerEvents:"none",zIndex:1}}/>}
      <div ref={nodeRef} onClick={handleClick} style={{position:"relative",background:bg,border:`1.5px solid ${hov?(hasSim?simCol+"bb":"#ffffff66"):border}`,borderRadius:10,padding:depth===0?"12px 20px":"9px 14px",minWidth:depth===0?158:120,maxWidth:depth===0?168:148,cursor:"pointer",color:"#fff",textAlign:"center",transition:"all .25s cubic-bezier(.4,0,.2,1)",boxShadow:hov?`0 0 30px rgba(${hasSim?simRgb:rgb},.5),inset 0 1px 0 rgba(255,255,255,.18)`:`0 0 12px rgba(${rgb},.16),inset 0 1px 0 rgba(255,255,255,.05)`,transform:hov?"translateY(-2px) scale(1.04)":"none",userSelect:"none",zIndex:2,animation:`nodeIn .5s cubic-bezier(.34,1.4,.64,1) ${delay}ms both`}}>
        <div style={{position:"absolute",top:0,left:"15%",right:"15%",height:1,background:"linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)",borderRadius:1}}/>
        {hasSim&&<div style={{position:"absolute",top:-9,left:"50%",transform:"translateX(-50%)",background:simCol,borderRadius:4,padding:"1px 7px",fontSize:7,color:"#000",fontWeight:800,letterSpacing:1.5,whiteSpace:"nowrap",zIndex:3,boxShadow:`0 0 10px ${simCol}88`}}>⚡ SIM</div>}
        <div style={{fontSize:depth===0?13.5:11,fontWeight:depth===0?700:500,lineHeight:1.4,whiteSpace:"pre-line",color:"#ecf0f1",letterSpacing:.3,marginTop:hasSim?8:0}}>{node.label}</div>
        <div style={{color:hasSim?simCol:text,fontSize:8.5,marginTop:5,letterSpacing:1.5,fontWeight:600,opacity:.85}}>
          {hasSim?"▶ SIMULADOR":isLeaf?"↗ WIKIPEDIA":isExpanded?"▾ COLAPSAR":"▸ EXPANDIR"}
        </div>
      </div>
      {hov&&node.desc&&<Tooltip text={node.desc} color={hasSim?simCol:glow}/>}
      {!isLeaf&&!hasSim&&(
        <div onClick={e=>{e.stopPropagation();window.open(node.url,"_blank");}} style={{position:"absolute",top:5,right:5,width:17,height:17,background:`rgba(${rgb},.15)`,border:`1px solid rgba(${rgb},.5)`,borderRadius:4,display:"flex",alignItems:"center",justifyContent:"center",fontSize:8,color:text,cursor:"pointer",transition:"all .2s",zIndex:3}}
          onMouseEnter={e=>e.currentTarget.style.background=`rgba(${rgb},.4)`} onMouseLeave={e=>e.currentTarget.style.background=`rgba(${rgb},.15)`}>↗</div>
      )}
    </div>
  );
}

function TreeNode({node,depth=0,nodeRefs,onToggle,expanded,sibIdx=0,onSim}){
  const hasChildren=node.children?.length>0;
  const isExpanded=expanded[node.id]!==false;
  const isLeaf=!hasChildren;
  const setRef=useCallback(el=>{if(el)nodeRefs.current[node.id]=el;},[node.id,nodeRefs]);
  return(
    <div style={{display:"flex",alignItems:"center"}}>
      <NodeBox node={node} depth={depth} nodeRef={setRef} onToggle={onToggle} isLeaf={isLeaf} isExpanded={isExpanded} sibIdx={sibIdx} onSim={onSim}/>
      {hasChildren&&isExpanded&&(
        <div style={{marginLeft:46,display:"flex",flexDirection:"column",gap:14,animation:"fadeIn .3s ease"}}>
          {node.children.map((child,i)=><TreeNode key={child.id} node={child} depth={depth+1} nodeRefs={nodeRefs} onToggle={onToggle} expanded={expanded} sibIdx={i} onSim={onSim}/>)}
        </div>
      )}
    </div>
  );
}

function ConnectorLines({nodeRefs,expanded,containerRef}){
  const [paths,setPaths]=useState([]);
  const [svgSize,setSvgSize]=useState({w:800,h:600});
  const compute=useCallback(()=>{
    if(!containerRef.current)return;
    const cr=containerRef.current.getBoundingClientRect();
    const np=[];
    function walk(node,depth){
      if(!node.children||expanded[node.id]===false||!node.children.length)return;
      const pe=nodeRefs.current[node.id];if(!pe)return;
      const pr=pe.getBoundingClientRect();
      node.children.forEach(child=>{
        const ce=nodeRefs.current[child.id];if(!ce)return;
        const ch=ce.getBoundingClientRect();
        const x1=pr.right-cr.left,y1=pr.top+pr.height/2-cr.top;
        const x2=ch.left-cr.left,y2=ch.top+ch.height/2-cr.top;
        const mx=(x1+x2)/2;
        np.push({id:`${node.id}->${child.id}`,d:`M${x1},${y1} C${mx},${y1} ${mx},${y2} ${x2},${y2}`,color:dc(depth).border,glow:dc(depth).glow});
        walk(child,depth+1);
      });
    }
    walk(TREE,0);
    setPaths(np);
    setSvgSize({w:Math.max(cr.width,containerRef.current.scrollWidth),h:Math.max(cr.height,containerRef.current.scrollHeight)});
  },[nodeRefs,expanded,containerRef]);
  useEffect(()=>{const t=setTimeout(compute,80);return()=>clearTimeout(t);},[compute]);
  useEffect(()=>{window.addEventListener("resize",compute);return()=>window.removeEventListener("resize",compute);},[compute]);
  return(
    <svg style={{position:"absolute",top:0,left:0,width:svgSize.w,height:svgSize.h,pointerEvents:"none",overflow:"visible",zIndex:0}}>
      <defs><filter id="lGlow" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
      {paths.map(p=>(
        <g key={p.id}>
          <path d={p.d} fill="none" stroke={p.glow} strokeWidth="5" strokeOpacity=".11"/>
          <path d={p.d} fill="none" stroke={p.color} strokeWidth="1.6" strokeOpacity=".72" filter="url(#lGlow)"/>
          <path d={p.d} fill="none" stroke="#fff" strokeWidth=".5" strokeOpacity=".07"/>
        </g>
      ))}
    </svg>
  );
}

function Legend(){
  const lvls=["Raíz","Categoría","Subcategoría","Familia","Método","Variante"];
  return(
    <div style={{position:"fixed",bottom:22,right:22,zIndex:200,background:"rgba(4,8,18,.93)",border:"1px solid #0d1e38",borderRadius:12,padding:"14px 18px",backdropFilter:"blur(10px)"}}>
      <div style={{color:"#2a4060",fontSize:8,letterSpacing:2.5,marginBottom:10,fontWeight:600}}>PROFUNDIDAD</div>
      {DC.slice(0,6).map((c,i)=>(
        <div key={i} style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
          <div style={{width:22,height:3,borderRadius:2,background:c.glow,boxShadow:`0 0 6px ${c.glow}`}}/>
          <span style={{color:c.text,fontSize:10,fontWeight:500}}>{lvls[i]}</span>
        </div>
      ))}
      <div style={{borderTop:"1px solid #0d1e38",marginTop:8,paddingTop:8,display:"flex",alignItems:"center",gap:10}}>
        <div style={{width:22,height:3,borderRadius:2,background:"#f39c12",boxShadow:"0 0 8px #f39c12"}}/>
        <span style={{color:"#f9c545",fontSize:10,fontWeight:500}}>⚡ Simulador</span>
      </div>
    </div>
  );
}

function TreePage({openSim}){
  const [expanded,setExpanded]=useState({});
  const nodeRefs=useRef({});
  const containerRef=useRef(null);
  const toggle=useCallback(id=>setExpanded(prev=>({...prev,[id]:prev[id]===false})),[]);
  return(
    <div style={{width:"100%",minHeight:"100vh",background:"#040810",fontFamily:"Oxanium,monospace",paddingTop:72}}>
      <BgGrid/><Scanline/><Particles/>
      <div style={{position:"relative",zIndex:10,textAlign:"center",padding:"44px 40px 34px",background:"linear-gradient(180deg,rgba(6,12,26,.98),rgba(4,8,16,.68))",borderBottom:"1px solid rgba(41,128,185,.12)"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#2980b9,#e74c3c,#27ae60,transparent)",backgroundSize:"200% 100%",animation:"borderSpin 4s linear infinite"}}/>
        <div style={{color:"#e74c3c",fontSize:10,letterSpacing:7,marginBottom:12,fontWeight:600}}>◆ TAXONOMÍA INTERACTIVA ◆</div>
        <h1 style={{color:"#f0f4f8",fontSize:34,fontWeight:300,letterSpacing:4,margin:0,animation:"headerGlow 4s ease-in-out infinite"}}>Algoritmos de Optimización</h1>
        <p style={{color:"#3d6080",fontSize:11,marginTop:14,letterSpacing:2}}>
          CLICK PARA EXPANDIR · HOVER PARA DESCRIPCIÓN · <span style={{color:"#f39c12"}}>⚡ PSO y DE: SIMULADOR EAPack v7.0</span>
        </p>
      </div>
      <div style={{position:"relative",zIndex:5,padding:"60px 70px 100px",overflowX:"auto"}}>
        <div ref={containerRef} style={{position:"relative",display:"inline-block",minWidth:"max-content"}}>
          <ConnectorLines nodeRefs={nodeRefs} expanded={expanded} containerRef={containerRef}/>
          <TreeNode node={TREE} depth={0} nodeRefs={nodeRefs} onToggle={toggle} expanded={expanded} onSim={openSim}/>
        </div>
      </div>
      <Legend/>
    </div>
  );
}

export default function App(){
  const [page,setPage]=useState("home");
  const [simAlgo,setSimAlgo]=useState(null);
  const openSim=useCallback(a=>setSimAlgo(a),[]);
  const closeSim=useCallback(()=>setSimAlgo(null),[]);
  return(
    <>
      <style>{G}</style>
      <TopBar onNav={setPage} cur={page}/>
      {page==="home"?<HomePage onGoTree={()=>setPage("tree")}/>:<TreePage openSim={openSim}/>}
      {simAlgo&&<SimulatorModal algo={simAlgo} onClose={closeSim}/>}
    </>
  );
}
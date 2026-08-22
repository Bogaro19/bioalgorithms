// src/data/taxonomyData.js

// 1. Árbol de Taxonomía
export const TREE = {
  id: "root", 
  label: "Metaheurísticas\nBioinspiradas",
  url: "https://es.wikipedia.org/wiki/Metaheur%C3%ADstica",
  desc: "Familia de métodos de optimización basados en poblaciones que simulan procesos biológicos o físicos observados en la naturaleza.",
  children: [
    { 
      id: "breeding", label: "Evolución basada\nen Reproducción", desc: "Inspirados en la evolución natural. Utilizan reproducción, cruza y supervivencia a través de generaciones.",
      children: [
        { id: "ga", label: "Algoritmos\nGenéticos (GA)", url: "https://es.wikipedia.org/wiki/Algoritmo_gen%C3%A9tico", desc: "Individuos evolucionan usando mecanismos de selección natural, cruza y mutación.", useCases: "Optimización de consultas complejas (JOINs) en esquemas de estrella para Data Warehouses y selección de características en pipelines de Machine Learning." },
        { id: "de", label: "Evolución\nDiferencial (DE)", url: "https://es.wikipedia.org/wiki/Evoluci%C3%B3n_diferencial", desc: "Perturba vectores con diferencias ponderadas. Alta eficiencia en espacios continuos.", simulator: "de", useCases: "Calibración de modelos predictivos y optimización de flujos de trabajo en procesamiento distribuido." },
        { id: "es", label: "Estrategias\nEvolutivas (ES)", url: "https://es.wikipedia.org/wiki/Estrategia_evolutiva", desc: "Se centra en la adaptación de parámetros continuos y mutación." },
        { id: "bbo", label: "Optimización basada en\nBiogeografía (BBO)", url: "https://en.wikipedia.org/wiki/Biogeography-based_optimization", desc: "Basado en la migración matemática de especies entre hábitats." },
        { id: "cro", label: "Optimización de\nArrecifes de Coral (CRO)", url: "https://en.wikipedia.org/wiki/Coral_reefs_optimization_algorithm", desc: "Simula la reproducción, lucha por el espacio y formación de arrecifes." }
      ]
    },
    { 
      id: "swarm", label: "Inteligencia\nde Enjambre", desc: "Sistemas descentralizados y autoorganizados donde la inteligencia colectiva emerge de agentes simples.",
      children: [
        { id: "flying", label: "Animales\nVoladores", desc: "Basados en el vuelo, ecolocalización y búsqueda de aves e insectos.",
          children: [
            { id: "pso", label: "Enjambre de\nPartículas (PSO)", url: "https://es.wikipedia.org/wiki/Optimizaci%C3%B3n_por_enjambre_de_part%C3%ADculas", desc: "Partículas exploran el espacio guiadas por la mejor posición global y local.", simulator: "pso", useCases: "Ajuste fino de hiperparámetros en arquitecturas convolucionales (CNNs como ResNet) y balanceo de carga en servidores en la nube." },
            { id: "abc", label: "Colonia de\nAbejas (ABC)", url: "https://en.wikipedia.org/wiki/Artificial_bee_colony_algorithm", desc: "Imita el comportamiento cooperativo de abejas recolectoras, observadoras y exploradoras." },
            { id: "bat", label: "Algoritmo de\nMurciélagos (BA)", url: "https://en.wikipedia.org/wiki/Bat_algorithm", desc: "Inspirado en los pulsos de ecolocalización de los murciélagos para buscar presas." },
            { id: "fa", label: "Algoritmo de\nLuciérnagas (FA)", url: "https://en.wikipedia.org/wiki/Firefly_algorithm", desc: "Basado en los ritmos y patrones de destellos de luz para atraer parejas." },
            { id: "cs", label: "Búsqueda\nCuckoo (CS)", url: "https://en.wikipedia.org/wiki/Cuckoo_search", desc: "Imita el comportamiento de parasitismo de cría de los pájaros cuco." }
          ]
        },
        { id: "terrestrial", label: "Animales\nTerrestres", desc: "Patrones de cacería grupal, rastreo y movimiento en tierra.",
          children: [
            { id: "aco", label: "Colonia de\nHormigas (ACO)", url: "https://es.wikipedia.org/wiki/Algoritmo_de_colonia_de_hormigas", desc: "Utiliza un rastro de feromonas para encontrar los caminos más cortos a los recursos.", useCases: "Optimización de rutas de última milla y enrutamiento de vehículos con ventanas de tiempo (CVRPTW) para gestión logística en PyMEs." },
            { id: "gwo", label: "Optimizador de\nLobo Gris (GWO)", url: "https://en.wikipedia.org/wiki/Grey_wolf_optimizer", desc: "Simula la jerarquía de liderazgo social y la táctica de caza en manada." },
            { id: "alo", label: "Optimizador de\nHormigas León (ALO)", url: "https://en.wikipedia.org/wiki/Ant_lion_optimizer", desc: "Modela la táctica de caza construyendo trampas en forma de cono en la arena." },
            { id: "goa", label: "Optimizador de\nSaltamontes (GOA)", url: "https://en.wikipedia.org/wiki/Grasshopper_optimisation_algorithm", desc: "Mimetiza el comportamiento de repulsión y atracción dentro de un enjambre en movimiento." }
          ]
        },
        { id: "aquatic", label: "Animales\nAcuáticos", desc: "Estrategias de nado cooperativo y caza bajo el agua.",
          children: [
            { id: "woa", label: "Optimización de\nBallenas (WOA)", url: "https://en.wikipedia.org/wiki/Whale_optimization_algorithm", desc: "Simula el método táctico de caza utilizando redes de burbujas de las ballenas jorobadas." },
            { id: "kh", label: "Manada de\nKrill (KH)", url: "https://en.wikipedia.org/wiki/Krill_herd_algorithm", desc: "Basado en la comunicación, formación de grupos y movimientos inducidos del krill." },
            { id: "ssa2", label: "Enjambre de\nSalpas (SSA)", url: "https://en.wikipedia.org/wiki/Salp_swarm_algorithm", desc: "Modelado matemático del movimiento sincronizado en cadena de las salpas." }
          ]
        },
        { id: "micro", label: "Microorganismos", desc: "Mecanismos de división celular, infección o movimiento de bacterias.",
          children: [
            { id: "bfoa", label: "Búsqueda Forrajera\nBacteriana (BFOA)", url: "https://en.wikipedia.org/wiki/Bacterial_foraging_optimization_algorithm", desc: "Inspirado en la locomoción y quimiotaxis de la bacteria E. coli." },
            { id: "sma", label: "Algoritmo de\nMoho Mucilaginoso", url: "https://en.wikipedia.org/wiki/Slime_mould_algorithm", desc: "Mimetiza las oscilaciones y el crecimiento de la red de venas del Physarum polycephalum." }
          ]
        }
      ]
    },
    { 
      id: "physics_chem", label: "Física y Química", desc: "Inspirados en leyes de gravitación, electromagnetismo, dinámica de fluidos y reacciones.",
      children: [
        { id: "gsa", label: "Búsqueda\nGravitacional (GSA)", url: "https://en.wikipedia.org/wiki/Gravitational_search_algorithm", desc: "Basado en la ley empírica de la gravedad y las interacciones cinemáticas de masas." },
        { id: "sa", label: "Recocido\nSimulado (SA)", url: "https://es.wikipedia.org/wiki/Recocido_simulado", desc: "Inspirado en la técnica de recocido en metalurgia para minimizar la energía.", useCases: "Sistemas de pronóstico de demanda combinados con redes neuronales recurrentes." },
        { id: "hs", label: "Búsqueda de\nArmonía (HS)", url: "https://en.wikipedia.org/wiki/Harmony_search", desc: "Imita el proceso de improvisación de los músicos para lograr la armonía perfecta." },
        { id: "wca", label: "Algoritmo del\nCiclo del Agua (WCA)", url: "https://en.wikipedia.org/wiki/Water_cycle_algorithm", desc: "Modela el flujo de la lluvia y los arroyos que desembocan en los ríos y el mar." },
        { id: "cro_chem", label: "Reacción\nQuímica (CRO)", url: "https://en.wikipedia.org/wiki/Chemical_reaction_optimization", desc: "Capta el principio de que las moléculas tienden al estado de energía mínima al colisionar." }
      ]
    },
    { 
      id: "social", label: "Comportamiento\nSocial Humano", desc: "Estrategias basadas en convenciones culturales, política, deportes o dinámicas grupales.",
      children: [
        { id: "tlbo", label: "Enseñanza y\nAprendizaje (TLBO)", url: "https://en.wikipedia.org/wiki/Teaching%E2%80%93learning-based_optimization", desc: "Simula el flujo bidireccional de influencia entre un profesor y la clase." },
        { id: "ica", label: "Competencia\nImperialista (ICA)", url: "https://en.wikipedia.org/wiki/Imperialist_competitive_algorithm", desc: "Basado en modelos sociopolíticos de asimilación, revolución y competencia colonial." },
        { id: "bso", label: "Tormenta de\nIdeas (BSO)", url: "https://en.wikipedia.org/wiki/Brain_storm_optimization", desc: "Imita el proceso iterativo de lluvia de ideas humana para resolver problemas." },
        { id: "ca", label: "Algoritmos\nCulturales (CA)", url: "https://en.wikipedia.org/wiki/Cultural_algorithm", desc: "Integra la evolución biológica poblacional apoyada por un espacio de creencias culturales." }
      ]
    },
    { 
      id: "plants", label: "Basados en Plantas", desc: "Técnicas que imitan el crecimiento, competencia por luz, polinización y dispersión de semillas.",
      children: [
        { id: "fpa", label: "Polinización de\nFlores (FPA)", url: "https://en.wikipedia.org/wiki/Flower_pollination_algorithm", desc: "Comprende la polinización cruzada global e iteraciones bióticas a escala local." },
        { id: "foa", label: "Optimización de\nBosques (FOA)", url: "https://en.wikipedia.org/wiki/Forest_optimization_algorithm", desc: "Simula la supervivencia, siembra y el crecimiento vertical natural de los árboles." },
        { id: "tsa", label: "Semillas de\nÁrbol (TSA)", url: "https://en.wikipedia.org/wiki/Tree_seed_algorithm", desc: "Inspirado en la diseminación de semillas en torno a los árboles para su propagación superficial." }
      ]
    }
  ]
};

// 2. Colores Base y Estadísticas
export const DC = [
  { glow: "#e74c3c", rgb: "231,76,60" },
  { glow: "#2980b9", rgb: "41,128,185" },
  { glow: "#00b4d8", rgb: "0,180,216" },
  { glow: "#9b59b6", rgb: "155,89,182" },
  { glow: "#27ae60", rgb: "39,174,96" },
  { glow: "#f39c12", rgb: "243,156,18" },
];

export const STATS = [
  { value: "23", label: "Algoritmos", color: "#2980b9", rgb: "41,128,185", icon: "⚙" },
  { value: "6", label: "Niveles profundidad", color: "#e74c3c", rgb: "231,76,60", icon: "◈" },
  { value: "2", label: "Simuladores activos", color: "#f39c12", rgb: "243,156,18", icon: "⚡" },
  { value: "4", label: "Funciones benchmark", color: "#27ae60", rgb: "39,174,96", icon: "∫" },
];

export const LEVEL_COLORS = [
  "var(--color-root)", "var(--color-category)", "var(--color-subcategory)", 
  "var(--color-family)", "var(--color-method)",
];

export const getLevelColor = (depth) => LEVEL_COLORS[Math.min(depth, LEVEL_COLORS.length - 1)];
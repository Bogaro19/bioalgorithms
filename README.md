# 🌳 Taxonomía Interactiva — Algoritmos de Optimización

Árbol interactivo que visualiza la clasificación completa de algoritmos de optimización, con animaciones, colores por profundidad y enlaces directos a Wikipedia.

## 🚀 Inicio Rápido

### Requisitos
- Node.js 18+ 
- npm o yarn

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

Abre http://localhost:5173 en tu navegador.

### Build para producción

```bash
npm run build
npm run preview
```

## 🎮 Cómo usar

| Acción | Resultado |
|--------|-----------|
| **Click** en nodo rama | Expande / colapsa hijos |
| **Click** en nodo hoja | Abre Wikipedia del algoritmo |
| **Botón ↗** en nodo | Abre Wikipedia directamente |
| **Hover** sobre nodo | Muestra descripción en tooltip |

## 🌿 Estructura del árbol

```
Algoritmos de Optimización
├── Deterministas
│   ├── Búsqueda Directa
│   │   ├── Escalador de Colina
│   │   └── Nelder-Mead
│   └── Búsqueda Indirecta
│       ├── Método de Newton
│       └── Gradiente Descendente
└── Estocásticos
    ├── Metaheurísticos
    │   ├── Basados en Población
    │   │   ├── Algoritmos Evolutivos
    │   │   │   ├── Algoritmos Genéticos
    │   │   │   ├── Evolución Diferencial
    │   │   │   └── Programación Genética
    │   │   └── Inteligencia Colectiva
    │   │       ├── Enjambre de Partículas (PSO)
    │   │       ├── Colonia de Abejas
    │   │       └── Colonia de Hormigas
    │   └── Basados en Trayectoria
    │       ├── Caminata Aleatoria
    │       ├── Recocido Simulado
    │       └── Búsqueda Tabú
    └── Heurísticos

```

## 🛠 Stack Tecnológico

- **React 18** — UI y estado
- **Vite 5** — Build tool
- **SVG dinámico** — Líneas conectoras con curvas Bézier
- **CSS Animations** — Sin librerías externas
- **Google Fonts** — Fuente Oxanium

## 📁 Estructura del proyecto

```
algorithm-tree/
├── index.html
├── vite.config.js
├── package.json
├── README.md
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx
    └── App.jsx
```

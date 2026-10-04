// ─── Benchmark functions — fiel al original Python (eapack/benchmarks/functions.py) ─

export function sphere(x) {
  return x.reduce((s, xi) => s + xi * xi, 0);
}

export function rastrigin(x) {
  const A = 10.0;
  return A * x.length + x.reduce((s, xi) => s + xi * xi - A * Math.cos(2 * Math.PI * xi), 0);
}

export function ackley(x) {
  const a = 20.0, b = 0.2, c = 2.0 * Math.PI;
  const d = x.length;
  const sumSq  = x.reduce((s, xi) => s + xi * xi, 0);
  const sumCos = x.reduce((s, xi) => s + Math.cos(c * xi), 0);
  return -a * Math.exp(-b * Math.sqrt(sumSq / d)) - Math.exp(sumCos / d) + a + Math.E;
}

export function rosenbrock(x) {
  let s = 0;
  for (let i = 0; i < x.length - 1; i++) {
    s += 100.0 * (x[i + 1] - x[i] ** 2) ** 2 + (1.0 - x[i]) ** 2;
  }
  return s;
}

// ─── Registry (matches Python registry.py) ────────────────────────────────────
export const BENCHMARKS = { sphere, rastrigin, ackley, rosenbrock };

export const DEFAULT_BOUNDS = {
  sphere:     [-5.0,   5.0  ],
  rastrigin:  [-5.12,  5.12 ],
  ackley:     [-5.0,   5.0  ],
  rosenbrock: [-2.0,   2.0  ],
};

export const BENCHMARK_META = {
  sphere:     { label: 'Sphere',     note: 'Unimodal — convexa y simple',          optima: 'f(0,...,0) = 0' },
  rastrigin:  { label: 'Rastrigin',  note: 'Multimodal — muchos mínimos locales',  optima: 'f(0,...,0) = 0' },
  ackley:     { label: 'Ackley',     note: 'Exponencial — engañosa en el plano',   optima: 'f(0,...,0) = 0' },
  rosenbrock: { label: 'Rosenbrock', note: 'Valle curvo — difícil convergencia',   optima: 'f(1,...,1) = 0' },
};

export function getBenchmark(name) {
  const fn = BENCHMARKS[name.toLowerCase()];
  if (!fn) throw new Error(`Benchmark desconocido: ${name}. Opciones: ${Object.keys(BENCHMARKS).join(', ')}`);
  return fn;
}

export function defaultBounds(name) {
  return DEFAULT_BOUNDS[name.toLowerCase()] ?? [-5.0, 5.0];
}

// Build contour surface data for Plotly — matches Python make_surface()
export function makeSurface(func, bounds, gridPoints = 100) {
  const [low, high] = bounds;
  const n = Math.max(30, Math.min(250, gridPoints));
  const xs = [], ys = [];
  for (let i = 0; i < n; i++) {
    const v = low + (i / (n - 1)) * (high - low);
    xs.push(v); ys.push(v);
  }
  // Z[i][j] = func([xs[j], ys[i]])  — row = y, col = x  (matches Python meshgrid)
  const z = [];
  for (let i = 0; i < n; i++) {
    const row = [];
    for (let j = 0; j < n; j++) row.push(func([xs[j], ys[i]]));
    z.push(row);
  }
  return { x: xs, y: ys, z };
}

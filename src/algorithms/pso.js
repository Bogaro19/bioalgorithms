// ─── PSO — fiel al original Python (eapack/algorithms/pso.py) ────────────────

function mulberry32(seed) {
  let s = (seed >>> 0) || 0xdeadbeef;
  return () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class PSO {
  constructor({ func, dim = 2, bounds = [-5, 5], popSize = 30,
                iterations = 100, w = 0.7, c1 = 1.5, c2 = 1.5, seed = null }) {
    this.func       = func;
    this.dim        = dim;
    this.low        = bounds[0];
    this.high       = bounds[1];
    this.popSize    = popSize;
    this.iterations = iterations;
    this.w          = w;
    this.c1         = c1;
    this.c2         = c2;
    this.rand       = mulberry32(seed ?? Math.floor(Math.random() * 2 ** 32));
    this.iteration  = 0;
    this.history    = [];

    // Init positions
    this.positions  = this._randomPop();

    // Velocities: uniform(-span, span) * 0.1  — matches Python
    const span = this.high - this.low;
    this.velocities = Array.from({ length: popSize }, () =>
      Array.from({ length: dim }, () => (this.rand() * 2 - 1) * span * 0.1)
    );

    // Personal bests
    this.pbest       = this.positions.map(p => [...p]);
    this.pbestScores = this.positions.map(p => this.func(p));

    // Global best
    const idx          = this._argmin(this.pbestScores);
    this.gbest         = [...this.pbest[idx]];
    this.gbestScore    = this.pbestScores[idx];
  }

  _randomPop() {
    return Array.from({ length: this.popSize }, () =>
      Array.from({ length: this.dim }, () =>
        this.low + this.rand() * (this.high - this.low)
      )
    );
  }

  _argmin(arr) {
    return arr.reduce((bi, v, i) => (v < arr[bi] ? i : bi), 0);
  }

  _clip(v) { return Math.max(this.low, Math.min(this.high, v)); }

  // One full vectorized step — matches Python PSO.step()
  step() {
    for (let i = 0; i < this.popSize; i++) {
      for (let d = 0; d < this.dim; d++) {
        const r1 = this.rand(), r2 = this.rand();
        this.velocities[i][d] =
            this.w  * this.velocities[i][d]
          + this.c1 * r1 * (this.pbest[i][d]  - this.positions[i][d])
          + this.c2 * r2 * (this.gbest[d]     - this.positions[i][d]);
        this.positions[i][d] = this._clip(this.positions[i][d] + this.velocities[i][d]);
      }
      const score = this.func(this.positions[i]);
      if (score < this.pbestScores[i]) {
        this.pbest[i]       = [...this.positions[i]];
        this.pbestScores[i] = score;
        if (score < this.gbestScore) {
          this.gbest      = [...this.positions[i]];
          this.gbestScore = score;
        }
      }
    }
    this.history.push(this.gbestScore);
    this.iteration++;
  }

  getPositions() { return this.positions.map(p => [...p]); }
  getBest()      { return { position: [...this.gbest], score: this.gbestScore }; }
  isDone()       { return this.iteration >= this.iterations; }
}

// ─── Differential Evolution — fiel al original Python (eapack/algorithms/de.py) ─

function mulberry32(seed) {
  let s = (seed >>> 0) || 0xdeadbeef;
  return () => {
    s |= 0; s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export class DifferentialEvolution {
  constructor({ func, dim = 2, bounds = [-5, 5], popSize = 30,
                iterations = 100, F = 0.8, CR = 0.9, seed = null }) {
    if (popSize < 4) throw new Error('DE necesita popSize >= 4');
    this.func       = func;
    this.dim        = dim;
    this.low        = bounds[0];
    this.high       = bounds[1];
    this.popSize    = popSize;
    this.iterations = iterations;
    this.F          = F;
    this.CR         = CR;
    this.rand       = mulberry32(seed ?? Math.floor(Math.random() * 2 ** 32));
    this.iteration  = 0;
    this.history    = [];

    this.population = this._randomPop();
    this.fitness    = this.population.map(x => this.func(x));
  }

  _randomPop() {
    return Array.from({ length: this.popSize }, () =>
      Array.from({ length: this.dim }, () =>
        this.low + this.rand() * (this.high - this.low)
      )
    );
  }

  _clip(v) { return Math.max(this.low, Math.min(this.high, v)); }

  _argmin(arr) {
    return arr.reduce((bi, v, i) => (v < arr[bi] ? i : bi), 0);
  }

  // Knuth shuffle to sample 3 distinct indices != i  (matches np.random.choice without replace)
  _sample3(exclude) {
    const pool = [];
    for (let j = 0; j < this.popSize; j++) if (j !== exclude) pool.push(j);
    for (let j = pool.length - 1; j > pool.length - 4; j--) {
      const k = Math.floor(this.rand() * (j + 1));
      [pool[j], pool[k]] = [pool[k], pool[j]];
    }
    return [pool[pool.length - 1], pool[pool.length - 2], pool[pool.length - 3]];
  }

  // One step — matches Python DE.step() exactly
  step() {
    for (let i = 0; i < this.popSize; i++) {
      const [r1, r2, r3] = this._sample3(i);

      // Mutation + clip
      const mutant = this.population[r1].map((v, d) =>
        this._clip(v + this.F * (this.population[r2][d] - this.population[r3][d]))
      );

      // Crossover mask — matches Python: mask = rng.random(dim) < CR
      const mask = Array.from({ length: this.dim }, () => this.rand() < this.CR);
      // Guarantee at least one True — matches Python: if not np.any(mask): mask[rng.integers(0,dim)] = True
      if (!mask.some(Boolean)) {
        mask[Math.floor(this.rand() * this.dim)] = true;
      }

      const trial = this.population[i].map((v, d) => mask[d] ? mutant[d] : v);
      const score = this.func(trial);

      if (score < this.fitness[i]) {
        this.population[i] = trial;
        this.fitness[i]    = score;
      }
    }
    this.history.push(this.getBest().score);
    this.iteration++;
  }

  getPositions() { return this.population.map(p => [...p]); }
  getBest() {
    const idx = this._argmin(this.fitness);
    return { position: [...this.population[idx]], score: this.fitness[idx] };
  }
  isDone() { return this.iteration >= this.iterations; }
}

// Adapted from csound/web-ide (LGPL-2.1); see NOTICE.md in this folder.
export const FFT_SIZE = 8192;
export const BANDS = 512;
export const HISTORY_COLUMNS = 300;
export const HISTORY_SECONDS = 10;
export const FRAME_SECONDS = HISTORY_SECONDS / HISTORY_COLUMNS;
export const MIN_DB = -100;
export const MAX_DB = 0;
export const MIN_HZ = 20;
export function maximumFrequency(sampleRate) {
  return Math.min(20000, sampleRate / 2);
}
export function frequencyPosition(hz, maximum) {
  return Math.log(hz / MIN_HZ) / Math.log(maximum / MIN_HZ);
}
export function frequencyAt(position, maximum) {
  return MIN_HZ * (maximum / MIN_HZ) ** position;
}
export function frequencyLabel(hz) {
  return hz >= 1000 ? `${+(hz / 1000).toFixed(1)}k` : `${Math.round(hz)}`;
}
export function frequencyTicks(maximum, pixels) {
  const ticks = [MIN_HZ, maximum];
  for (const hz of [1000, 100, 10000, 50, 200, 500, 2000, 5000]) {
    const position = frequencyPosition(hz, maximum);
    if (
      hz < maximum &&
      ticks.every(
        (tick) =>
          Math.abs(position - frequencyPosition(tick, maximum)) * pixels >= 22,
      )
    )
      ticks.push(hz);
  }
  return ticks.sort((a, b) => a - b);
}
export function createBandSampler(sampleRate) {
  const maximum = maximumFrequency(sampleRate);
  const binHz = sampleRate / FFT_SIZE;
  const starts = new Uint16Array(BANDS);
  const ends = new Uint16Array(BANDS);
  for (let band = 0; band < BANDS; band++) {
    starts[band] = Math.max(
      1,
      Math.floor(frequencyAt(band / BANDS, maximum) / binHz),
    );
    ends[band] = Math.min(
      FFT_SIZE / 2,
      Math.max(
        starts[band] + 1,
        Math.ceil(frequencyAt((band + 1) / BANDS, maximum) / binHz),
      ),
    );
  }
  return (fft, target) => {
    for (let band = 0; band < BANDS; band++) {
      let db = MIN_DB;
      for (let bin = starts[band]; bin < ends[band]; bin++) {
        if (fft[bin] > db) db = fft[bin];
      }
      target[band] = Math.round(
        Math.min(1, (db - MIN_DB) / (MAX_DB - MIN_DB)) * 255,
      );
    }
  };
}
export class SpectralHistory {
  data = new Uint8Array(BANDS * HISTORY_COLUMNS);
  latest = new Uint8Array(BANDS);
  head = 0;
  previousTime;
  resetClock() {
    this.previousTime = undefined;
  }
  clear() {
    this.data.fill(0);
    this.latest.fill(0);
    this.head = 0;
    this.resetClock();
  }
  isDue(time) {
    return (
      this.previousTime === undefined ||
      time - this.previousTime + 1e-6 >= FRAME_SECONDS
    );
  }
  append(bands, time) {
    const elapsed =
      this.previousTime === undefined
        ? FRAME_SECONDS
        : time - this.previousTime;
    const steps = Math.floor((elapsed + 1e-6) / FRAME_SECONDS);
    if (steps < 1) return false;
    this.previousTime =
      this.previousTime === undefined
        ? time
        : this.previousTime + steps * FRAME_SECONDS;
    for (let step = 0; step < Math.min(steps, HISTORY_COLUMNS); step++) {
      const offset = this.head * BANDS;
      this.data.fill(0, offset, offset + BANDS);
      if (step === Math.min(steps, HISTORY_COLUMNS) - 1)
        this.data.set(bands, offset);
      this.head = (this.head + 1) % HISTORY_COLUMNS;
    }
    this.latest.set(bands);
    return true;
  }
}

// Adapted from csound/web-ide (LGPL-2.1); see NOTICE.md in this folder.
import { FFT_SIZE, MIN_DB, MAX_DB } from "./analysis";
export function observeAudio(csound, ready, failed) {
  let disposed = false;
  let source;
  let analyser;
  const connect = async () => {
    try {
      const node = await csound.getNode();
      if (disposed || source || !node) return;
      source = node;
      analyser = node.context.createAnalyser();
      analyser.fftSize = FFT_SIZE;
      analyser.minDecibels = MIN_DB;
      analyser.maxDecibels = MAX_DB;
      analyser.smoothingTimeConstant = 0;
      node.connect(analyser);
      ready(analyser);
    } catch {
      if (!disposed) failed();
    }
  };
  csound.on("realtimePerformanceStarted", connect);
  void connect();
  return () => {
    disposed = true;
    csound.off("realtimePerformanceStarted", connect);
    if (source && analyser) {
      try {
        source.disconnect(analyser);
      } catch {}
      analyser.disconnect();
    }
  };
}

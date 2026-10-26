import { useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import useCsound from "../../CsoundContext";
import { observeAudio } from "./spectral/audio";
import { BANDS, createBandSampler } from "./spectral/analysis";
import { createSpectralRenderer, spectralPalette } from "./spectral/renderer";

const theme = {
  mode: "dark",
  background: "#211d29",
  textColor: "#eee8f5",
  altTextColor: "#c0b8ca",
  line: "#443b51",
  caretColor: "#cbb5ed",
  font: { monospace: "ui-monospace, monospace" },
};

export default function Spectrogram() {
  const [{ libcsound, isPlaying, isPaused, isRendering, isLoading }] =
    useCsound();
  const engine = !isRendering && (isPlaying || isPaused) ? libcsound : null;
  const [frozen, setFrozen] = useState(
    () =>
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false,
  );
  const [mode, setMode] = useState("spectrogram");
  const [analyser, setAnalyser] = useState(null);
  const [error, setError] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const heatmap = useRef(null),
    overlay = useRef(null),
    display = useRef(null);
  useEffect(() => {
    let renderer;
    try {
      renderer = createSpectralRenderer(
        heatmap.current,
        overlay.current,
        theme,
      );
    } catch {
      setError(true);
      return;
    }
    display.current = renderer;
    const observer = new ResizeObserver(renderer.resize);
    observer.observe(overlay.current);
    renderer.resize();
    return () => {
      observer.disconnect();
      renderer.dispose();
      display.current = null;
    };
  }, []);
  useEffect(() => {
    display.current?.configure(mode, theme);
  }, [mode]);
  useEffect(() => {
    setAnalyser(null);
    if (!engine) return;
    if (display.current) setError(false);
    setHasAudio(false);
    return observeAudio(
      engine,
      (node) => {
        display.current?.start(node.context.sampleRate);
        setAnalyser(node);
        setHasAudio(true);
      },
      () => setError(true),
    );
  }, [engine]);
  useEffect(() => {
    const renderer = display.current;
    if (!analyser || !renderer || frozen || !isPlaying) return;
    const fft = new Float32Array(analyser.frequencyBinCount);
    const bands = new Uint8Array(BANDS);
    const sample = createBandSampler(analyser.context.sampleRate);
    let frame;
    renderer.history.resetClock();
    const draw = () => {
      if (
        !document.hidden &&
        renderer.history.isDue(analyser.context.currentTime)
      ) {
        analyser.getFloatFrequencyData(fft);
        sample(fft, bands);
        if (renderer.history.append(bands, analyser.context.currentTime))
          renderer.draw();
      }
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [analyser, frozen, isPlaying]);
  const message = error
    ? "Audio analysis is unavailable."
    : isRendering
      ? "Available during live playback."
      : isLoading
        ? "Waiting for audio…"
        : !hasAudio
          ? "Play an example to see its sound."
          : "";
  return (
    <div
      role="region"
      className="tool-panel"
      id="console-spectrogram"
      aria-label="Spectral analyzer"
    >
      <div className="tool-heading">
        <strong>See the sound</strong>
        <div style={{ display: "flex", gap: 4 }}>
          <Button
            variant="outline"
            aria-pressed={mode === "spectrum"}
            onClick={() =>
              setMode(mode === "spectrum" ? "spectrogram" : "spectrum")
            }
          >
            {mode === "spectrum" ? "Show history" : "Show spectrum"}
          </Button>
          <Button
            variant="outline"
            aria-pressed={frozen}
            onClick={() => setFrozen(!frozen)}
          >
            {frozen ? "Unfreeze" : "Freeze"}
          </Button>
        </div>
      </div>
      <div
        style={{
          position: "relative",
          height: 166,
          background: theme.background,
          borderRadius: 7,
          overflow: "hidden",
        }}
      >
        <div
          ref={heatmap}
          style={{
            position: "absolute",
            left: 48,
            top: 12,
            right: 12,
            bottom: 24,
          }}
        />
        <canvas
          ref={overlay}
          role="img"
          aria-label={
            mode === "spectrogram"
              ? "Spectrogram: logarithmic frequency from 20 Hz to 20 kHz or Nyquist, over ten seconds. Color shows level from -100 to 0 dB."
              : "Spectrum: logarithmic frequency and level from -100 to 0 dB."
          }
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
        {message && (
          <div
            role="status"
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              placeItems: "center",
              background: "#211d29dc",
              color: "#eee8f5",
              fontSize: 12,
            }}
          >
            {message}
          </div>
        )}
      </div>
      <div
        className="hint"
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <span>
          {frozen
            ? "Frozen"
            : isPaused
              ? "Paused"
              : isPlaying
                ? "Live"
                : "Stopped"}
        </span>
        <span style={{ marginLeft: "auto" }}>−100 dB</span>
        <span
          aria-hidden="true"
          style={{
            background: spectralPalette(theme).css,
            height: 6,
            width: 90,
            borderRadius: 3,
          }}
        />
        <span>0 dB</span>
      </div>
    </div>
  );
}

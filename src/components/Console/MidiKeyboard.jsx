import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Keyboard, KeyboardShortcuts, MidiNumbers } from "react-piano";
import "react-piano/dist/styles.css";
import useCsound from "../../CsoundContext";
import { createMidiSession } from "./midi";

const noop = () => {};
export default function MidiKeyboard() {
  const [{ libcsound, isPlaying, isRendering }] = useCsound();
  const [octave, setOctave] = useState(0),
    [channel, setChannel] = useState(0);
  const [active, setActive] = useState([]),
    [ready, setReady] = useState(false),
    [error, setError] = useState("");
  const session = useRef(null);
  const pianoHost = useRef(null);
  const [compact, setCompact] = useState(() => window.innerWidth < 460);
  const range = {
    first: 48 + 12 * octave,
    last: (compact ? 60 : 77) + 12 * octave,
  };
  useEffect(() => {
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) =>
      setCompact(entry.contentRect.width < 420),
    );
    observer.observe(pianoHost.current);
    return () => observer.disconnect();
  }, []);
  const shortcuts = useMemo(
    () =>
      KeyboardShortcuts.create({
        firstNote: range.first,
        lastNote: range.last,
        keyboardConfig: KeyboardShortcuts.HOME_ROW,
      }),
    [range.first, range.last],
  );
  const release = () => {
    session.current?.release();
    setActive([]);
  };
  useEffect(() => {
    setReady(false);
    setError("");
    setActive([]);
    if (!libcsound || !isPlaying || isRendering) return;
    let disposed = false;
    const midi = createMidiSession(libcsound, channel, () => {
      if (!disposed) setError("MIDI input is unavailable.");
    });
    session.current = midi;
    Promise.resolve(libcsound.isRequestingRtMidiInput())
      .then((enabled) => {
        if (!disposed) setReady(Boolean(enabled));
      })
      .catch(() => {
        if (!disposed) setError("MIDI input is unavailable.");
      });
    const silence = () => {
      midi.release();
      setActive([]);
    };
    const hidden = () => {
      if (document.hidden) silence();
    };
    window.addEventListener("blur", silence);
    document.addEventListener("visibilitychange", hidden);
    return () => {
      disposed = true;
      midi.release();
      session.current = null;
      window.removeEventListener("blur", silence);
      document.removeEventListener("visibilitychange", hidden);
    };
  }, [libcsound, isPlaying, isRendering, channel, octave, compact]);
  const on = (note) => {
    if (!ready) return;
    session.current?.noteOn(note);
    setActive((notes) => (notes.includes(note) ? notes : [...notes, note]));
  };
  const off = (note) => {
    session.current?.noteOff(note);
    setActive((notes) => notes.filter((n) => n !== note));
  };
  const shift = (step) => {
    release();
    setOctave((o) => Math.max(-2, Math.min(2, o + step)));
  };
  return (
    <div
      role="region"
      className="tool-panel"
      id="console-keyboard"
      aria-label="MIDI keyboard"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) release();
      }}
    >
      <div className="tool-heading">
        <strong>Play a little</strong>
        <label style={{ fontSize: 11 }}>
          Channel{" "}
          <select
            aria-label="MIDI channel"
            value={channel}
            onChange={(event) => {
              release();
              setChannel(Number(event.target.value));
            }}
            style={{ padding: 4, border: "1px solid #d8d2e0", borderRadius: 4 }}
          >
            {Array.from({ length: 16 }, (_, i) => (
              <option key={i} value={i}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Button
            variant="outline"
            aria-label="Octave down"
            disabled={octave === -2}
            onClick={() => shift(-1)}
          >
            −
          </Button>
          <span style={{ fontSize: 11 }}>
            C{3 + octave}–{compact ? `C${4 + octave}` : `F${5 + octave}`}
          </span>
          <Button
            variant="outline"
            aria-label="Octave up"
            disabled={octave === 2}
            onClick={() => shift(1)}
          >
            +
          </Button>
        </div>
      </div>
      <div
        ref={pianoHost}
        tabIndex={0}
        role="group"
        aria-label="Piano keys. Use the home row to play; Z and X change octave."
        style={{ height: 112, opacity: ready ? 1 : 0.55 }}
        onKeyDown={(event) => {
          if (
            event.repeat ||
            event.metaKey ||
            event.ctrlKey ||
            event.altKey ||
            event.target.tagName === "SELECT"
          )
            return;
          const key = event.key.toLowerCase();
          if (key === "z" || key === "x") {
            event.preventDefault();
            shift(key === "z" ? -1 : 1);
            return;
          }
          const shortcut = shortcuts.find((s) => s.key === key);
          if (shortcut) {
            event.preventDefault();
            on(shortcut.midiNumber);
          }
        }}
        onKeyUp={(event) => {
          const shortcut = shortcuts.find(
            (s) => s.key === event.key.toLowerCase(),
          );
          if (shortcut) {
            event.preventDefault();
            off(shortcut.midiNumber);
          }
        }}
        css={{
          ".ReactPiano__NoteLabelContainer": {
            position: "relative",
            width: "100%",
            height: "100%",
            margin: 0,
          },
          ".ReactPiano__Key--active": { background: "#9f82c5 !important" },
          ".ReactPiano__Key--accidental": {
            background: "#332b40",
            borderColor: "#faf9fc",
          },
          ".piano-note": {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            minHeight: 0,
            padding: "0 0 7px",
            display: "flex",
            alignItems: "end",
            justifyContent: "center",
            background: "transparent !important",
            border: "0 !important",
            borderRadius: "0 0 4px 4px",
            fontSize: 9,
            color: "inherit",
            touchAction: "none",
          },
          ".ReactPiano__Key--accidental .piano-note": { color: "#f5f1fb" },
          ".piano-note:focus-visible": { outlineOffset: -3 },
        }}
      >
        <Keyboard
          noteRange={range}
          activeNotes={active}
          onPlayNoteInput={noop}
          onStopNoteInput={noop}
          renderNoteLabel={({ midiNumber }) => (
            <button
              className="piano-note"
              aria-label={MidiNumbers.getAttributes(midiNumber).note}
              aria-pressed={active.includes(midiNumber)}
              aria-disabled={!ready}
              onPointerDown={(event) => {
                event.preventDefault();
                event.currentTarget.focus();
                event.currentTarget.setPointerCapture(event.pointerId);
                on(midiNumber);
              }}
              onPointerUp={() => off(midiNumber)}
              onPointerCancel={() => off(midiNumber)}
              onLostPointerCapture={() => off(midiNumber)}
              onKeyDown={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  event.preventDefault();
                  if (!event.repeat) on(midiNumber);
                }
              }}
              onKeyUp={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  event.preventDefault();
                  off(midiNumber);
                }
              }}
            >
              {shortcuts
                .find((s) => s.midiNumber === midiNumber)
                ?.key.toUpperCase() ??
                (midiNumber % 12 === 0
                  ? `C${3 + octave + (midiNumber - range.first) / 12}`
                  : "")}
            </button>
          )}
        />
      </div>
      <p className="hint" role="status">
        {error ||
          (ready
            ? "Click or touch the keys. Focus the piano to play with A, W, S… Change octave with Z / X."
            : isPlaying && !isRendering
              ? "This example has no live MIDI input. MIDI examples use -M0 in CsOptions."
              : "Play a MIDI example to use the keyboard.")}
      </p>
    </div>
  );
}

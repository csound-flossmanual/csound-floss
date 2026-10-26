import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { Rnd } from "react-rnd";
import {
  XIcon,
  WaveformIcon,
  PianoKeysIcon,
  TerminalWindowIcon,
  DotsSixIcon,
  CaretDownIcon,
} from "@phosphor-icons/react";
import useCsound from "../../CsoundContext";
import Transport from "./Transport";
import { fitConsole } from "./geometry";
import * as styles from "./styles";

const Spectrogram = lazy(() => import("./Spectrogram"));
const MidiKeyboard = lazy(() => import("./MidiKeyboard"));
const viewport = () => ({
  width: window.innerWidth,
  height: window.visualViewport?.height ?? window.innerHeight,
});

function ConsoleDialog() {
  const [
    { logs, example, isPlaying, isPaused, isLoading, isRendering },
    dispatch,
  ] = useCsound();
  const [spectrum, setSpectrum] = useState(false),
    [keyboard, setKeyboard] = useState(false);
  const [follow, setFollow] = useState(true);
  const [box, setBox] = useState(() =>
    fitConsole(
      {
        x: window.innerWidth - 576,
        y: viewport().height - 342,
        width: 552,
        height: 318,
      },
      viewport(),
    ),
  );
  const pre = useRef(null);
  const opener = useRef(document.activeElement);
  const closeButton = useRef(null);
  useEffect(() => {
    if (opener.current?.getAttribute("aria-label") === "Open console")
      closeButton.current?.focus();
  }, []);
  const height = 318 + (spectrum ? 252 : 0) + (keyboard ? 220 : 0);
  useEffect(() => {
    const resize = () => setBox((box) => fitConsole(box, viewport(), height));
    resize();
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
    };
  }, [height]);
  useEffect(() => {
    if (follow && pre.current) pre.current.scrollTop = pre.current.scrollHeight;
  }, [logs, follow]);
  const close = () => {
    dispatch({ type: "CLOSE_LOG_DIALOG" });
    opener.current?.focus();
  };
  const status = isLoading
    ? "Working…"
    : isRendering
      ? "Rendering"
      : isPaused
        ? "Paused"
        : isPlaying
          ? "Playing"
          : example
            ? "Stopped"
            : "Ready";
  return (
    <div css={styles.layer}>
      <Rnd
        css={[styles.controls, styles.panel]}
        size={{ width: box.width, height: box.height }}
        position={{ x: box.x, y: box.y }}
        minWidth={Math.min(340, viewport().width - 16)}
        minHeight={Math.min(280, viewport().height - 16)}
        maxWidth={viewport().width - 16}
        maxHeight={viewport().height - 16}
        bounds="parent"
        dragHandleClassName="console-header"
        cancel="button:not(.move-console)"
        disableDragging={window.innerWidth <= 600}
        enableResizing={
          window.innerWidth > 600
            ? { bottomRight: true, bottomLeft: true }
            : false
        }
        onDragStop={(_, position) =>
          setBox((box) => fitConsole({ ...box, ...position }, viewport()))
        }
        onResizeStop={(_, __, element, ___, position) =>
          setBox(
            fitConsole(
              {
                ...position,
                width: element.offsetWidth,
                height: element.offsetHeight,
              },
              viewport(),
            ),
          )
        }
        role="dialog"
        aria-modal="false"
        aria-label="Csound WebAssembly console"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.stopPropagation();
            close();
          }
        }}
      >
        <header className="console-header">
          <TerminalWindowIcon size={34} className="console-mark" />
          <div className="console-title">
            <small>Csound running in your browser</small>
            <strong title={example?.filename}>
              {example?.filename ?? "Your sound starts here"}
            </strong>
          </div>
          <Button
            className="icon-button move-console"
            variant="plain"
            aria-label="Move console with arrow keys"
            title="Drag to move, or use arrow keys"
            onKeyDown={(event) => {
              const directions = {
                ArrowLeft: [-16, 0],
                ArrowRight: [16, 0],
                ArrowUp: [0, -16],
                ArrowDown: [0, 16],
              };
              if (directions[event.key]) {
                event.preventDefault();
                const [x, y] = directions[event.key];
                setBox((box) =>
                  fitConsole(
                    { ...box, x: box.x + x, y: box.y + y },
                    viewport(),
                  ),
                );
              }
            }}
          >
            <DotsSixIcon size={20} />
          </Button>
          <Button
            ref={closeButton}
            className="icon-button"
            variant="plain"
            aria-label="Close console"
            title="Close console; playback continues"
            onClick={close}
          >
            <XIcon size={18} />
          </Button>
        </header>
        <div className="transport-row">
          <Transport labels />
          <span className="status" role="status" data-playing={isPlaying}>
            {status}
          </span>
        </div>
        <div className="console-body">
          <div className="log-heading">
            <strong>Output</strong>
            <Button
              variant="plain"
              aria-pressed={follow}
              onClick={() => setFollow(!follow)}
            >
              <CaretDownIcon size={12} />
              {follow ? "Following log" : "Follow log"}
            </Button>
          </div>
          <pre
            ref={pre}
            className={`log${logs.length ? "" : " empty"}`}
            aria-label="Csound output"
            tabIndex={0}
            onScroll={(event) => {
              const el = event.currentTarget;
              setFollow(el.scrollHeight - el.scrollTop - el.clientHeight < 12);
            }}
          >
            {logs.length
              ? logs.join("\n")
              : "Press Play above an example. Its messages will appear here."}
          </pre>
          <Suspense
            fallback={
              <div className="tool-panel" role="status">
                Loading tools…
              </div>
            }
          >
            {spectrum && <Spectrogram />}
            {keyboard && <MidiKeyboard />}
          </Suspense>
        </div>
        <footer className="tools" css={styles.controls}>
          <Button
            variant="outline"
            aria-expanded={spectrum}
            aria-controls="console-spectrogram"
            aria-pressed={spectrum}
            onClick={() => setSpectrum(!spectrum)}
          >
            <WaveformIcon size={19} />
            Spectrogram
          </Button>
          <Button
            variant="outline"
            aria-expanded={keyboard}
            aria-controls="console-keyboard"
            aria-pressed={keyboard}
            onClick={() => setKeyboard(!keyboard)}
          >
            <PianoKeysIcon size={19} />
            MIDI keyboard
          </Button>
        </footer>
      </Rnd>
    </div>
  );
}

export default function Console() {
  const [{ logDialogOpen }] = useCsound();
  return logDialogOpen ? <ConsoleDialog /> : null;
}

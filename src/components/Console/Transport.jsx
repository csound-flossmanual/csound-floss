import { Button } from "@chakra-ui/react";
import {
  PlayIcon,
  PauseIcon,
  StopIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import useCsound from "../../CsoundContext";

export default function Transport({ source, filename, labels = false }) {
  const [{ playback, example, isPlaying, isPaused, isLoading, isRendering }] =
    useCsound();
  const name = filename ?? example?.filename;
  const code = source ?? example?.source;
  const current = !filename || example?.filename === filename;
  return (
    <div className="transport" role="group" aria-label="Playback controls">
      <Button
        variant="outline"
        className="play"
        aria-label={isPaused && current ? "Resume" : "Play"}
        disabled={!code || isPlaying || isLoading || (isPaused && !current)}
        onClick={() =>
          isPaused ? playback.resume() : playback.play(code, name)
        }
      >
        {isLoading && current ? (
          <CircleNotchIcon className="loading" size={18} />
        ) : (
          <PlayIcon size={18} weight="fill" />
        )}
        {labels && (isLoading ? "Working…" : isPaused ? "Resume" : "Play")}
      </Button>
      <Button
        variant="outline"
        aria-label="Pause"
        disabled={!current || !isPlaying || isLoading || isRendering}
        onClick={() => playback.pause()}
      >
        <PauseIcon size={18} weight="fill" />
        {labels && "Pause"}
      </Button>
      <Button
        variant="outline"
        aria-label="Stop"
        disabled={!current || (!isPlaying && !isPaused && !isLoading)}
        onClick={() => playback.stop()}
      >
        <StopIcon size={18} weight="fill" />
        {labels && "Stop"}
      </Button>
    </div>
  );
}

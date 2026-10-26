import { Button } from "@chakra-ui/react";
import useCsound from "../../CsoundContext";
import PlayIcon from "../../assets/play.svg";
import PauseIcon from "../../assets/pause.svg";
import StopIcon from "../../assets/stop.svg";
import LogIcon from "../../assets/logs_icon_wikimedia.svg";
import * as ß from "./styles";

const PlayControlsLoadingSpinner = () => (
  <div
    style={{
      backgroundColor: "unset",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      border: "none",
    }}
  >
    <div css={ß.playLoadingSpinner} />
  </div>
);

const PlayControls = ({ initialEditorState, currentEditorState }) => {
  const [
    {
      playback,
      isLoading,
      isPaused,
      isPlaying,
      isRendering,
      logDialogClosed,
      logDialogOpen,
    },
    csoundDispatch,
  ] = useCsound();
  const onPlay = () =>
    isPaused
      ? playback.resume()
      : playback.play(currentEditorState ?? initialEditorState);
  return (
    <div css={ß.controllers}>
      <Button
        onClick={onPlay}
        disabled={isPlaying || isLoading}
        variant="outline"
      >
        {isLoading ? (
          <PlayControlsLoadingSpinner />
        ) : (
          <img
            alt="play"
            src={PlayIcon}
            style={{ height: 40, width: 20, marginLeft: 1 }}
          />
        )}
      </Button>
      <Button
        onClick={() => playback.pause()}
        style={{ marginLeft: 3 }}
        disabled={!isPlaying || isLoading || isRendering}
        variant="outline"
      >
        <img alt="pause" src={PauseIcon} style={{ height: 30, width: 20 }} />
      </Button>
      <Button
        onClick={() => playback.stop()}
        style={{ marginLeft: 3 }}
        disabled={!isPlaying && !isPaused}
        variant="outline"
      >
        <img alt="stop" src={StopIcon} style={{ height: 22, width: 22 }} />
      </Button>
      <Button
        onClick={() => csoundDispatch({ type: "OPEN_LOG_DIALOG" })}
        style={{ marginLeft: 3 }}
        disabled={logDialogOpen || (!logDialogOpen && !logDialogClosed)}
        variant="outline"
      >
        <img
          alt="console logs"
          src={LogIcon}
          style={{
            height: 22,
            width: 22,
            marginTop: 5,
            filter: "unset",
          }}
        />
      </Button>
    </div>
  );
};

export default PlayControls;

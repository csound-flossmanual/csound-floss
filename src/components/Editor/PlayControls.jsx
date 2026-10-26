import { useState } from "react";
import { Button } from "@chakra-ui/react";
import {
  DownloadSimpleIcon,
  TerminalWindowIcon,
  CircleNotchIcon,
} from "@phosphor-icons/react";
import useCsound from "../../CsoundContext";
import Transport from "../Console/Transport";
import { controls } from "../Console/styles";

export default function PlayControls({
  initialEditorState,
  currentEditorState,
  filename = "example.csd",
}) {
  const [{ logDialogOpen }, dispatch] = useCsound();
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const source = currentEditorState ?? initialEditorState;
  const download = async () => {
    setDownloading(true);
    setError("");
    try {
      const { downloadExample } = await import("../../csound/download");
      await downloadExample(source, filename);
    } catch (error) {
      setError(error.message);
    } finally {
      setDownloading(false);
    }
  };
  return (
    <>
      <div css={controls} className="editor-controls">
        <Transport source={source} filename={filename} />
        <Button
          variant="outline"
          aria-label="Open console"
          title="Open WebAssembly console"
          disabled={logDialogOpen}
          onClick={() => dispatch({ type: "OPEN_LOG_DIALOG" })}
        >
          <TerminalWindowIcon size={20} />
        </Button>
        <Button
          variant="outline"
          className="download"
          onClick={download}
          disabled={downloading}
          title="Download this code and its samples as a ZIP"
        >
          {downloading ? (
            <CircleNotchIcon size={18} className="loading" />
          ) : (
            <DownloadSimpleIcon size={18} />
          )}
          {downloading ? "Preparing…" : "Download ZIP"}
        </Button>
      </div>
      {error && <p role="alert">{error}</p>}
    </>
  );
}

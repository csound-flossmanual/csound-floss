// Ported from csound/web-ide's audio-session.ts.
export function beginPlaybackAudioSession() {
  if (typeof navigator === "undefined") return;
  const ios =
    /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);
  if (!ios) return;
  try {
    const session = navigator.audioSession;
    if (!session) return;
    const previous = session.type;
    let applied = previous;
    let released = false;
    const setType = (type) => {
      if (session.type !== type) session.type = type;
      applied = session.type;
    };
    // iOS treats Web Audio as ambient sound unless we request playback.
    // https://bugs.webkit.org/show_bug.cgi?id=237322#c6
    if (previous !== "play-and-record") setType("playback");
    return {
      enableInput() {
        if (released) return;
        try {
          setType("play-and-record");
        } catch {
          // Session support must not block microphone permission requests.
        }
      },
      release() {
        if (released) return;
        released = true;
        try {
          if (session.type === applied) setType(previous);
        } catch {
          // The document may already be closing.
        }
      },
    };
  } catch {
    // Older browsers and restricted embeds may reject session changes.
  }
}

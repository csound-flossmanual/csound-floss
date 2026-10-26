import { useLayoutEffect, useRef, useState } from "react";
import { Button } from "@chakra-ui/react";
import { CaretDownIcon } from "@phosphor-icons/react";

export default function Log({ logs }) {
  const [follow, setFollow] = useState(true);
  const pre = useRef(null);
  const lastScrollTop = useRef(0);
  const scrollToEnd = () => {
    pre.current.scrollTop = pre.current.scrollHeight;
    lastScrollTop.current = pre.current.scrollTop;
  };

  useLayoutEffect(() => {
    if (follow) scrollToEnd();
  }, [logs, follow]);

  useLayoutEffect(() => {
    if (!follow || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(scrollToEnd);
    observer.observe(pre.current);
    return () => observer.disconnect();
  }, [follow]);

  return (
    <div className="log-pane">
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
          if (el.scrollHeight - el.scrollTop - el.clientHeight < 12) {
            setFollow(true);
          } else if (el.scrollTop < lastScrollTop.current) {
            // Resizing or wrapping lines can move the bottom without a user scroll.
            setFollow(false);
          }
          lastScrollTop.current = el.scrollTop;
        }}
      >
        {logs.length
          ? logs.join("\n")
          : "Press Play above an example. Its messages will appear here."}
      </pre>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";

export default function StickyFooter({
  children,
  onFooterStateChange,
  normalStyles,
  stickyStyles,
  bottomThreshold = 50,
}) {
  const marker = useRef(null);
  const [atBottom, setAtBottom] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setAtBottom(entry.isIntersecting);
        onFooterStateChange?.(entry.isIntersecting);
      },
      { rootMargin: `0px 0px ${bottomThreshold}px 0px` },
    );
    observer.observe(marker.current);
    return () => observer.disconnect();
  }, [bottomThreshold, onFooterStateChange]);
  return (
    <div style={normalStyles}>
      <div ref={marker} />
      <div
        style={
          atBottom
            ? undefined
            : { ...stickyStyles, position: "fixed", bottom: 0, left: 0 }
        }
      >
        {children}
      </div>
    </div>
  );
}

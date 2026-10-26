export function fitConsole(box, viewport, height = box.height) {
  const gap = 8;
  const width = Math.min(box.width, viewport.width - gap * 2);
  height = Math.min(height, viewport.height - gap * 2);
  return {
    width,
    height,
    x: Math.max(gap, Math.min(box.x, viewport.width - width - gap)),
    y: Math.max(gap, Math.min(box.y, viewport.height - height - gap)),
  };
}

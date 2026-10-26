/** @vitest-environment jsdom */
import { vi, afterEach, it, expect } from "vitest";
import React, { act } from "react";
import { createRoot } from "react-dom/client";
import Math from "../src/components/Math";
import { loadMathJax } from "../src/components/Math/loader";

vi.mock("../src/components/Math/loader", () => ({ loadMathJax: vi.fn() }));
global.IS_REACT_ACT_ENVIRONMENT = true;
let root;
afterEach(async () => {
  if (root) await act(() => root.unmount());
  document.body.replaceChildren();
});

it("renders inline and display math and ignores stale chapter renders", async () => {
  const renders = [];
  const tex2chtmlPromise = vi.fn(
    (formula, options) =>
      new Promise((resolve) => renders.push({ formula, options, resolve })),
  );
  loadMathJax.mockResolvedValue({ tex2chtmlPromise });
  const host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root.render(React.createElement(Math.Node, { formula: "x", inline: true })),
  );
  await act(async () =>
    root.render(
      React.createElement(Math.Node, { formula: "y", inline: false }),
    ),
  );
  const first = document.createElement("mjx-container");
  first.textContent = "x";
  const second = document.createElement("mjx-container");
  second.textContent = "y";
  await act(async () => renders[1].resolve(second));
  await act(async () => renders[0].resolve(first));
  expect(host.textContent).toBe("y");
  expect(renders.map(({ options }) => options.display)).toEqual([false, true]);
});

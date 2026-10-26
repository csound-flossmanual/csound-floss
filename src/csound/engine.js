import engineUrl from "@csound/browser/dist/csound.js?url";

// Keep the upstream module and embedded WASM as one cached, on-demand asset.
export async function Csound(options) {
  const engine = await import(/* @vite-ignore */ engineUrl);
  return engine.Csound(options);
}

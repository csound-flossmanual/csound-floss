import engineUrl from "@csound/browser/dist/csound.js?url";
import { plugins } from "@csound/plugins";

// Keep the upstream module and embedded WASM as one cached, on-demand asset.
export async function Csound(options) {
  const engine = await import(/* @vite-ignore */ engineUrl);
  return engine.Csound({ withPlugins: Object.values(plugins), ...options });
}

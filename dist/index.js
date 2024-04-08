import l from "http";
import u from "https";
let n, s;
const i = [], c = (e) => {
  const t = e.createServer;
  i.push([t, e]), e.createServer = function(...r) {
    return i.forEach(([o, f]) => {
      f.createServer = o;
    }), n = t.call(this, ...r), s && s(n), n;
  };
}, p = () => {
  n || (c(l), c(u));
}, v = (e) => {
  n = e.httpServer;
};
function a(e) {
  return {
    name: "svelte-kit-websocket",
    config(t) {
      const r = t.server = t.server || {};
      (r.hmr === !0 || !r.hmr) && (r.hmr = {}), r.hmr.port = e || (r.port || 57777) + 1;
    },
    async transform(t, r) {
      return r.endsWith("@sveltejs/kit/src/runtime/server/index.js") ? { code: t.replace(/([\s\S]*import.*?from.*?('|").*?\2;\n)/, `$1import {handle} from 'vite-sveltekit-node-ws';
handle();`) } : null;
    },
    configurePreviewServer: v,
    configureServer: v
  };
}
const d = (e) => {
  n ? e(n) : s = e;
};
export {
  a as default,
  p as handle,
  d as useServer
};

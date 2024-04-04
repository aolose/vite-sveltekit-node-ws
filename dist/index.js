import h from "http";
import d from "https";
import { getEventListeners as m } from "events";
let e, n;
const a = [], f = (r) => {
  const t = r.createServer;
  a.push([t, r]), r.createServer = function(...s) {
    return a.forEach(([o, i]) => {
      i.createServer = o;
    }), e = t.call(this, ...s), n && n(e), e;
  };
}, E = () => {
  e || (f(h), f(d));
}, p = (r) => {
  if (e = r.httpServer, console.log("srv", !!e), !e)
    return;
  const t = e.on, s = m(e, "upgrade");
  e.on = function(o, i) {
    if (o === "upgrade") {
      this == null || this.removeAllListeners("upgrade"), t.call(this, "upgrade", (c, l, u) => {
        c.url === "/" ? s.forEach((v) => v.call(this, c, l, u)) : i.call(this, c, l, u);
      });
      return;
    }
    t.call(this, o, i);
  }, n && n(e);
};
function b() {
  return {
    name: "svelte-kit-websocket",
    async transform(r, t) {
      return t.endsWith("@sveltejs/kit/src/runtime/server/index.js") ? { code: r.replace(/([\s\S]*import.*?from.*?('|").*?\2;\n)/, `$1import {handle} from 'vite-sveltekit-node-ws';
handle();`) } : null;
    },
    configurePreviewServer: p,
    configureServer: p
  };
}
const j = (r) => {
  e ? r(e) : n = r;
};
export {
  b as default,
  E as handle,
  j as server
};

import h from "http";
import m from "https";
import { getEventListeners as d } from "events";
let e, n;
const f = [], a = (r) => {
  const t = r.createServer;
  f.push([t, r]), r.createServer = function(...s) {
    return f.forEach(([o, c]) => {
      c.createServer = o;
    }), e = t.call(this, ...s), n && n(e), e;
  };
}, E = () => {
  e || (a(h), a(m));
}, p = (r) => {
  if (e = r.httpServer, console.log("srv", !!e), !e)
    return;
  const t = e.on, s = d(e, "upgrade");
  e.on = function(o, c) {
    if (o === "upgrade") {
      this == null || this.removeAllListeners("upgrade"), t.call(this, "upgrade", (i, l, u) => {
        i.url === "/" ? s.forEach((v) => v.call(this, i, l, u)) : c.call(this, i, l, u);
      });
      return;
    }
    t.call(this, o, c);
  }, n && n(e);
};
function b() {
  return {
    name: "svelte-kit-websocket",
    async transform(r, t) {
      return t.endsWith("@sveltejs/kit/src/runtime/server/index.js") ? { code: r.replace(/([\s\S]*import.*?from.*?('|").*?\2;\n)/, `$1import {handle} from 'vite-sveltekit-cf-ws';
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

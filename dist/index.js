import m from "http";
import v from "https";
let n, c, i, s;
const d = (e) => {
  const t = e.on;
  e.on = function(...r) {
    r[0] === "request" ? (t.call(this, "request", function(o, p) {
      S(o.url) || r[1].call(this, o, p);
    }), s = () => {
      e.on = t;
    }) : t.call(this, ...r);
  };
}, S = (e) => {
  if (!(!e || !i))
    return i(new URL(e, "http://a.a").pathname);
}, a = [], u = (e) => {
  const t = e.createServer;
  a.push([t, e]), e.createServer = function(...r) {
    return a.forEach(([l, o]) => {
      o.createServer = l;
    }), n = t.call(this, ...r), d(n), h(), n;
  };
}, h = () => {
  n && c && setTimeout(() => {
    s == null || s(), c(n);
  });
}, j = () => {
  n || (u(m), u(v));
}, f = (e) => {
  n = e.httpServer;
};
function x() {
  return {
    name: "vite-sveltekit-node-ws",
    async transform(e, t) {
      return t.endsWith("@sveltejs/kit/src/runtime/server/index.js") ? { code: e.replace(/([\s\S]*import.*?from.*?(['"]).*?\2;\n)/, `$1import {handle} from 'vite-sveltekit-node-ws';
handle();`) } : null;
    },
    configurePreviewServer: f,
    configureServer: f
  };
}
const P = (e, t) => {
  i = t, c = e, h();
};
export {
  x as default,
  j as handle,
  P as useServer
};

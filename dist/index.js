import m from "http";
import v from "https";
let n, i, l, s;
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
  if (!(!e || !l))
    return l(new URL(e, "http://a.a").pathname);
}, a = [], u = (e) => {
  const t = e.createServer;
  a.push([t, e]), e.createServer = function(...r) {
    return a.forEach(([c, o]) => {
      o.createServer = c;
    }), n = t.call(this, ...r), d(n), f(), n;
  };
}, f = () => {
  n && i && setTimeout(() => {
    s == null || s(), i(n);
  });
}, j = () => {
  n || (u(m), u(v));
}, h = (e) => {
  n = e.httpServer;
};
function x(e) {
  return {
    name: "vite-sveltekit-node-ws",
    config(t) {
      const r = t.server = t.server || {};
      (r.hmr === !0 || !r.hmr) && (r.hmr = {}), r.hmr.port = e || (r.port || 57777) + 1;
    },
    async transform(t, r) {
      return r.endsWith("@sveltejs/kit/src/runtime/server/index.js") ? { code: t.replace(/([\s\S]*import.*?from.*?(['"]).*?\2;\n)/, `$1import {handle} from 'vite-sveltekit-node-ws';
handle();`) } : null;
    },
    configurePreviewServer: h,
    configureServer: h
  };
}
const P = (e, t) => {
  l = t, i = e, f();
};
export {
  x as default,
  j as handle,
  P as useServer
};

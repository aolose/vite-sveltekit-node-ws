import d from "http";
import b from "https";
const p = () => c ? global.httpSrv : m, v = (e) => {
  e && (c ? global.httpSrv = e : m = e);
};
let c = !1, m, i, a, l;
const k = (e) => {
  const r = e.on;
  e.on = function(...n) {
    n[0] === "request" ? (r.call(this, "request", function(t, s) {
      g(t.url) || n[1].call(this, t, s);
    }), l = () => {
      e.on = r;
    }) : r.call(this, ...n);
  };
}, g = (e) => {
  if (!(!e || !a))
    return a(new URL(e, "http://a.a").pathname);
}, f = [], u = (e) => {
  const r = e.createServer;
  f.push([r, e]), e.createServer = function(...n) {
    f.forEach(([t, s]) => {
      s.createServer = t;
    });
    const o = r.call(this, ...n);
    return v(o), k(o), S(), o;
  };
}, S = () => {
  const e = p();
  e && i && setTimeout(() => {
    l == null || l(), i(e);
  });
}, G = () => {
  p() || (u(d), u(b));
}, h = (e) => {
  v(e.httpServer);
};
function P({
  hmrPort: e,
  buildModification: r = `import {handle} from 'vite-sveltekit-node-ws';
handle();`,
  global: n = !1
} = {}) {
  return c = n, {
    name: "vite-sveltekit-node-ws",
    config(o) {
      if (e === !1)
        return;
      const t = o.server = o.server || {};
      (t.hmr === !0 || !t.hmr) && (t.hmr = {}), t.hmr.port = e || (t.port || 57777) + 1;
    },
    async transform(o, t) {
      if (t.endsWith("@sveltejs/kit/src/runtime/server/index.js")) {
        const s = r;
        return { code: o.replace(/([\s\S]*import.*?from.*?(['"]).*?\2;\n)/, `$1${s}`) };
      }
      return null;
    },
    configurePreviewServer: h,
    configureServer: h
  };
}
const j = ({
  callback: e,
  skip: r,
  global: n = !1
}) => {
  c = n, a = r, i = e, S();
};
export {
  P as default,
  G as handle,
  j as useServer
};

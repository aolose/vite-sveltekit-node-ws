import {type Plugin, PreviewServer, ViteDevServer} from 'vite';
import http from 'http'
import https from 'https'
import http2 from 'http2'
import {getEventListeners} from 'events';

type Http = typeof http | typeof https | typeof http2
type CreateServer = Http['createServer']
type Server = ReturnType<CreateServer>

let srv: Server | undefined | null
let cb: ((s: Server) => void) | undefined

const clean = [] as [CreateServer, Http][]
const hack = (target: Http) => {
    const gen = target.createServer
    clean.push([gen, target])
    // @ts-ignore
    target.createServer = function (...args) {
        clean.forEach(([b, a]) => {
            a.createServer = b
        })
        // @ts-ignore
        srv = gen.call(this, ...args)
        if (cb) cb(srv)
        return srv
    }
}

const handle = () => {
    if (srv) return
    hack(http)
    hack(https)
}

const devHandle = (server: ViteDevServer | PreviewServer) => {
    srv = server.httpServer
}

function WsPlugin(hrmPort?: number) {
    return {
        name: 'svelte-kit-websocket',
        config(cfg) {
            const s = cfg.server = cfg.server || {}
            if (s.hmr === true || !s.hmr) s.hmr = {}
            s.hmr.port = hrmPort || s.port + 1 || 57777
        },
        async transform(code, id) {
            if (id.endsWith('@sveltejs/kit/src/runtime/server/index.js')) {
                const rep = `import {handle} from 'vite-sveltekit-node-ws';\nhandle();`
                return {code: code.replace(/([\s\S]*import.*?from.*?('|").*?\2;\n)/, `$1${rep}`)}
            }
            return null;
        },
        configurePreviewServer: devHandle,
        configureServer: devHandle
    } satisfies Plugin;
}

const useServer = (callback: (server: Server) => void) => {
    if (srv) callback(srv)
    else cb = callback
}

export {useServer, handle};
export default WsPlugin;

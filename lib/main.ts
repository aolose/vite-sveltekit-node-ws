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
    console.log('srv', !!srv)
    if (!srv) return
    const on = srv.on
    type args = Parameters<typeof on>
    // @ts-ignore
    const up = getEventListeners(srv, 'upgrade')
    // @ts-ignore
    srv.on = function (name: args[0], listener: args[1]) {
        if (name === 'upgrade') {
            this?.removeAllListeners('upgrade')
            // @ts-ignore
            on.call(this, 'upgrade', (req, socket, head) => {
                const url = req.url
                if (url === '/') up.forEach(a => a.call(this, req, socket, head))
                else listener.call(this, req, socket, head)
            })
            return
        }
        // @ts-ignore
        on.call(this, name, listener)
    }
    if (cb) cb(srv)
}

function WsPlugin() {
    return {
        name: 'svelte-kit-websocket',
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

const server = (get: (server: Server) => void) => {
    if (srv) get(srv)
    else cb = get
}

export {server, handle};
export default WsPlugin;

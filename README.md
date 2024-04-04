# vite-sveltekit-node-ws

### Support 
- dev 
- preview 
- online?


### Note
I just expose the httpServer from vite dev/preview/build, 

It is not as easy to use as pure httpserver. 

If you use it like `new WebsocketServer({server:httpServer})`, there will be some strange problems. 

Since I'm new to Vite's ViteDevServer and PreviewServer, I don't know what it does with httpserver.

Anyway, you can still use it like below.





### Usage

vite.config.ts

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import ws from 'vite-sveltekit-node-ws';

export default defineConfig({
    plugins: [
		sveltekit(),
		ws()
	]
});

```

hooks.server.ts 

```ts
import {server} from "vite-sveltekit-node-ws";
import {WebSocketServer} from 'ws'

server(httpServer => {
    const ss = new WebSocketServer({noServer: true})
    httpServer.on('upgrade', (req, sock, head) => {
        const onUpgrade = (ws) => {
            ws.send('hi')
            ws.on('message',(data)=>{
                ws.send('echo:'+data)
            })
        }
        if (req.url === '/hello') {
            ss.handleUpgrade(req, sock, head, onUpgrade)
        }
    })
})
```

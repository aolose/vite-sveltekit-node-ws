# vite-sveltekit-node-ws

This plugin just exposes httpServer without any dependencies. In theory, you can use any websocket framework you like.

[Try it with socket.io](https://github.com/aolose/sk-node-ws-demo)

Notice: for [ws](https://github.com/websockets/ws) user, You may encounter the error `RangeError: Invalid WebSocket frame: invalid status code xxxx`,
To avoid this error, specify a different port.
```ts
//vite.config.ts
export default defineConfig({
    plugins: [sveltekit(),ws()],
    server:{
        hmr:{port:5678}
    }
});
```

### Support 
- dev 
- preview 
- online

### Usage

vite.config.ts

```ts
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';
import ws from 'vite-sveltekit-node-ws';

export default defineConfig({
    plugins: [sveltekit(), ws()]
});

```

hooks.server.ts 

```ts
import {useServer} from "vite-sveltekit-node-ws";
import {WebSocketServer} from 'ws'

useServer((server) => {
    const ss = new WebSocketServer({server})
    ss.on('connection',a=>{
        a.on('message',e=>{
            a.send(`echo: ${e}`)
        })
    })
},(pathname:string)=>{
    // It is optional 
    // You can block some requests to prevent them from being processed by SveltetKit
    // return pathname.startsWith('/hello')
    return false
})

```

### API

```ts
import wsPlugin, {useServer} from "vite-sveltekit-node-ws";
```

### useServer(serverHandle, pathHandle?)
```ts
serverHandle: ( server ) => void
pathHandle?:  ( pathname: string ) => boolean 
```
- server : the httpServer from Polka(production mode) or from Vite(development.preview mode)
- pathHandle: return true if the request no need to be handled by sveltekit
- pathname: the request's pathname



# vite-sveltekit-node-ws-global

NOTE: THis is a modified version of vite-sveltekit-node-ws with some custom changes. Once (or if) those changes are merged into the master repository this one will be removed.

This plugin just exposes httpServer without any dependencies. In theory, you can use any websocket framework you like.

[Try it with socket.io](https://github.com/aolose/sk-node-ws-demo)

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
    plugins: [sveltekit(), ws({global: true})]
});

```

hooks.server.ts 

```ts
import {useServer} from "vite-sveltekit-node-ws";
import {WebSocketServer} from 'ws'

useServer({
    global: true, //This is optional, uses global namespace rather than local namespace
    callback: (server) => {
        const ss = new WebSocketServer({server})
        ss.on('connection',a=>{
            a.on('message',e=>{
                a.send(`echo: ${e}`)
            })
        })
    },
    skip: (pathname:string)=>{
        // It is optional 
        // You can block some requests to prevent them from being processed by SveltetKit
        // return pathname.startsWith('/hello')
        return false
    }})

```

### API

```ts
import wsPlugin, {useServer} from "vite-sveltekit-node-ws";
```

### wsPlugin({hmrPort?: number | false; buildModification?: string; global?: boolean; })
- hmrPort: Specify the port of hmr in vite config. If set to false, then no port modifications will be done
- global: Sets the httpServer that the ws server is connected to to be in the global namespace rather than local.
- buildModifiation: Sets the modification to the index file. Not requierd to be set.

### useServer({callback: serverHandle, skip: pathHandle?, global?: boolean})
```ts
serverHandle: ( server ) => void
pathHandle?:  ( pathname: string ) => boolean 
```
- server : the httpServer from Polka(production mode) or from Vite(development.preview mode)
- pathHandle: return true if the request no need to be handled by sveltekit
- pathname: the request's pathname
- global: sets the request to use the global namespace. Should be set to the same as wsPlugin.



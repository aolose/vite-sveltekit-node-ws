# vite-sveltekit-node-ws

### Support 
- dev 
- preview 
- online?

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
})

```

### Config

hrmPort
- type: number | undefined
- Specify the port of hrm
```ts
import ws from 'vite-sveltekit-node-ws';
ws(9999)
```

import { default as default_2 } from 'http';
import { default as default_3 } from 'https';
import { default as default_4 } from 'http2';
import { PreviewServer } from 'vite';
import { TransformPluginContext } from 'rollup';
import { ViteDevServer } from 'vite';

declare type CreateServer = Http['createServer'];

export declare const handle: () => void;

declare type Http = typeof default_2 | typeof default_3 | typeof default_4;

declare type Server = ReturnType<CreateServer>;

declare let skipPath: ((url: string) => boolean) | undefined;

export declare const useServer: (callback: (server: Server) => void, skip?: typeof skipPath) => void;

declare function WsPlugin(): {
    name: string;
    transform(this: TransformPluginContext, code: string, id: string): Promise<{
        code: string;
    } | null>;
    configurePreviewServer: (server: ViteDevServer | PreviewServer) => void;
    configureServer: (server: ViteDevServer | PreviewServer) => void;
};
export default WsPlugin;

export { }

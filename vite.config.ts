import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [dts({ rollupTypes: true })],
	build: {
		rollupOptions: {
			external: ['vite','http','https','http2','events']
		},
		lib: {
			entry: resolve(__dirname, 'lib/main.ts'),
			fileName: 'index',
			formats: ['es', 'cjs']
		}
	}
});

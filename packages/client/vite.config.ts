import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import tsconfigPaths from 'vite-tsconfig-paths';
import path from 'path';
import svgr from 'vite-plugin-svgr';

dotenv.config();

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '');

	return {
		server: {
			port: Number(process.env.CLIENT_PORT) || 3000,
		},
		define: {
			__SERVER_PORT__: JSON.stringify(process.env.SERVER_PORT),
			__IS_DEV__: JSON.stringify(mode === 'development'),
			__S_P__: JSON.stringify(env.SERVER_PORT),
		},
		plugins: [
			react(),
			svgr({
				include: '**/*.svg',
			}),
			tsconfigPaths(),
		],
		resolve: {
			alias: {
				// Явно указываем алиас для src
				src: path.resolve(__dirname, 'src'),
			},
		},
		css: {
			preprocessorOptions: {
				scss: {
					// Важно: путь к папке src, чтобы @use 'src/...' резолвился
					includePaths: [path.resolve(__dirname, 'src')],
				},
			},
		},
	};
});

import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import fs from 'fs/promises';
import apiRouter from './routes/index';

dotenv.config();

async function start() {
	const app = express();
	const port = Number(process.env.SERVER_PORT) || 3001;
	app.use(express.json());
	const clientPath = path.resolve(__dirname, '../client');

	const vite = await createViteServer({
		root: clientPath,
		server: { middlewareMode: true },
		appType: 'custom',
	});

	app.use(
		cors({
			credentials: true,
			origin: 'http://localhost:3000',
		}),
	);
	app.use(apiRouter);

	// Используем Vite middleware (для HMR, модулей и т.д.)
	app.use(vite.middlewares);

	// Отдаем статику вручную
	app.use('/src', express.static(path.resolve(clientPath, 'src')));
	app.use('/assets', express.static(path.resolve(clientPath, 'assets')));
	app.use(
		'/favicon.ico',
		express.static(path.resolve(clientPath, 'favicon.ico')),
	);
	app.use('/logo.ico', express.static(path.resolve(clientPath, 'logo.ico')));
	app.use('/sw.js', express.static(path.resolve(clientPath, 'sw.js')));

	// Игнорируем SSR для статических файлов по расширению
	app.get(/\.(js|ts|jsx|tsx|css|map|webp|png|jpg|jpeg|svg)$/, (_, res) => {
		res.status(404).end();
	});

	// Обработка SSR (в конце)
	app.get('*', async (req, res) => {
		try {
			const url = req.originalUrl;

			// Чтение index.html
			let template = await fs.readFile(
				path.resolve(clientPath, 'index.html'),
				'utf-8',
			);
			template = await vite.transformIndexHtml(url, template);

			// SSR рендеринг
			const { render } = await vite.ssrLoadModule(
				'/src/entry-server.tsx',
			);
			const appHtml = await render(url);

			const html = template.replace('<!--ssr-outlet-->', appHtml);
			res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
		} catch (e) {
			if (e instanceof Error) {
				vite.ssrFixStacktrace(e);
				console.error('[SSR Error]', e);
				res.status(500).end(e.message);
			} else {
				console.error('Unknown error', e);
				res.status(500).end('Unknown error');
			}
		}
	});

	app.listen(port, () => {
		console.log(`✅ SSR сервер запущен на http://localhost:${port}`);
	});
}

start();

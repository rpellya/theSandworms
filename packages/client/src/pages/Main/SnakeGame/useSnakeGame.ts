import { useEffect, useRef, useState } from 'react';
import playerFaceUrl from '/src/assets/faces/face-001.webp';
import botFaceUrl from '/src/assets/faces/face-002.webp';
import bgImgUrl from '/src/assets/bg/bg-004.webp';

export const useSnakeGame = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const playerFaceRef = useRef<HTMLImageElement | null>(null);
	const botFaceRef = useRef<HTMLImageElement | null>(null);
	const [score, setScore] = useState(0);
	const playerFace = new Image();
	const botFace = new Image();
	playerFace.src = playerFaceUrl;
	botFace.src = botFaceUrl;

	// Настройки
	const snakeLength = 30;
	let speed = 1.5;
	const botSpeed = 1;
	const botLength = 45;

	playerFace.onload = () => {
		playerFaceRef.current = playerFace;
	};

	botFace.onload = () => {
		botFaceRef.current = botFace;
	};

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');

		const resizeCanvas = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		};

		resizeCanvas();
		window.addEventListener('resize', resizeCanvas);

		const center = { x: canvas.width / 2, y: canvas.height / 2 };
		const mouse = { x: center.x, y: center.y };
		const snake = [{ x: 0, y: 0 }];
		let foods = [spawnFood()];
		let localScore = 0;
		let bgPattern: HTMLImageElement | null = null;

		let botSnake = [{ x: 100, y: 100 }];
		let botDirection = Math.random() * 2 * Math.PI;

		document.addEventListener('mousemove', (e) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		});

		/**
		 * Генерация еды
		 */
		function spawnFood() {
			const range = 500;
			return {
				x: snake[0].x + (Math.random() - 0.5) * range,
				y: snake[0].y + (Math.random() - 0.5) * range,
			};
		}

		/**
		 * Обновление змейки игрока
		 */
		function updateSnake() {
			const head = snake[0];
			const dx = mouse.x - center.x;
			const dy = mouse.y - center.y;
			const angle = Math.atan2(dy, dx);
			const newX = head.x + Math.cos(angle) * speed;
			const newY = head.y + Math.sin(angle) * speed;
			snake.unshift({ x: newX, y: newY });
			if (snake.length > snakeLength) snake.pop();
		}

		/**
		 * Обновление змейки бота
		 */
		function updateBotSnake() {
			if (!botSnake.length) return;
			const head = botSnake[0];
			if (Math.random() < 0.2) {
				botDirection += (Math.random() - 0.6) * 0.6;
			}
			const newX = head.x + Math.cos(botDirection) * botSpeed;
			const newY = head.y + Math.sin(botDirection) * botSpeed;
			botSnake.unshift({ x: newX, y: newY });
			if (botSnake.length > botLength) botSnake.pop();
		}

		/**
		 * Отрисовка фона
		 * @param offsetX
		 * @param offsetY
		 */
		function drawBackground(offsetX: number, offsetY: number) {
			if (!canvas || !ctx || !bgPattern) return;
			const patternSize = 256;
			const startX = -(
				((offsetX % patternSize) + patternSize) %
				patternSize
			);
			const startY = -(
				((offsetY % patternSize) + patternSize) %
				patternSize
			);

			for (
				let x = startX - patternSize;
				x < canvas.width + patternSize;
				x += patternSize
			) {
				for (
					let y = startY - patternSize;
					y < canvas.height + patternSize;
					y += patternSize
				) {
					ctx.drawImage(
						bgPattern,
						Math.floor(x),
						Math.floor(y),
						patternSize,
						patternSize,
					);
				}
			}
		}

		/**
		 * Отрисовка змейки игрока
		 */
		function drawSnake() {
			if (!ctx) return;

			for (let i = snake.length - 1; i > 0; i--) {
				const part = snake[i];
				const screenX = center.x + (part.x - snake[0].x);
				const screenY = center.y + (part.y - snake[0].y);
				ctx.beginPath();
				ctx.arc(screenX, screenY, 12, 0, Math.PI * 2);
				ctx.fillStyle = `hsl(${i * 3}, 100%, 50%)`;
				ctx.fill();
			}

			// Отрисовка лица и поворот в направлении движения
			const playerFaceImg = playerFaceRef.current;
			if (playerFaceImg && playerFaceImg.complete) {
				const head = snake[0];
				const neck = snake[1] || head; // Используем вторую точку для направления
				const dx = head.x - neck.x;
				const dy = head.y - neck.y;
				const angle = Math.atan2(dy, dx) - Math.PI / 2;

				ctx.save();
				ctx.translate(center.x, center.y);
				ctx.rotate(angle);
				ctx.drawImage(playerFaceImg, -12, -12, 24, 24); // Рисуем относительно центра
				ctx.restore();
			} else {
				ctx.beginPath();
				ctx.arc(center.x, center.y, 12, 0, Math.PI * 2);
				ctx.fillStyle = '#a10';
				ctx.fill();
			}
		}

		/**
		 * Отрисовка змейки бота
		 */
		function drawBotSnake() {
			if (!ctx || botSnake.length === 0) return;
			for (let i = botSnake.length - 1; i > 0; i--) {
				const part = botSnake[i];
				const screenX = center.x + (part.x - snake[0].x);
				const screenY = center.y + (part.y - snake[0].y);
				ctx.beginPath();
				ctx.arc(screenX, screenY, 10, 0, Math.PI * 2);
				ctx.fillStyle = `hsl(${i * 4}, 80%, 40%)`;
				ctx.fill();
			}
			const head = botSnake[0];
			const neck = botSnake[1] || head; // Используем вторую точку для направления
			const headX = center.x + (head.x - snake[0].x);
			const headY = center.y + (head.y - snake[0].y);

			const botFaceImg = botFaceRef.current;
			if (botFaceImg && botFaceImg.complete) {
				// Вычисляем угол для головы бота
				const dx = head.x - neck.x;
				const dy = head.y - neck.y;
				const angle = Math.atan2(dy, dx) - Math.PI / 2; // Лицо должно смотреть вперед

				ctx.save();
				ctx.translate(headX, headY);
				ctx.rotate(angle); // Поворачиваем в направлении движения
				ctx.drawImage(botFaceImg, -10, -10, 20, 20); // Рисуем относительно центра
				ctx.restore();
			} else {
				ctx.beginPath();
				ctx.arc(headX, headY, 12, 0, Math.PI * 2);
				ctx.fillStyle = '#a10';
				ctx.fill();
			}
		}

		/**
		 * Логика контакта головы змейки бота и тела змейки игрока
		 */
		function checkBotCollisionWithPlayer() {
			const botHead = botSnake[0];
			for (let i = 5; i < snake.length; i++) {
				const part = snake[i];
				const dist = Math.hypot(botHead.x - part.x, botHead.y - part.y);
				if (dist < 10) return true;
			}
			return false;
		}

		/**
		 * При умирании бота вместо его змейки генерируется еда
		 */
		function spawnFoodFromBot() {
			const count = Math.floor(botSnake.length / 6);
			const step = Math.floor(botSnake.length / count);
			for (
				let i = 0;
				i < botSnake.length && foods.length < count;
				i += step
			) {
				foods.push({ x: botSnake[i].x, y: botSnake[i].y });
			}
		}

		/**
		 * Отрисовка еды
		 */
		function drawFood() {
			if (!ctx) return;
			for (const food of foods) {
				const screenX = center.x + (food.x - snake[0].x);
				const screenY = center.y + (food.y - snake[0].y);
				ctx.beginPath();
				ctx.arc(screenX, screenY, 10, 0, Math.PI * 2);
				ctx.fillStyle = 'blue';
				ctx.fill();
			}
		}

		/**
		 * Главный цикл отрисовки
		 */
		function loop() {
			if (!canvas || !ctx) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			updateSnake();
			updateBotSnake();

			const head = snake[0];
			foods = foods.filter((food) => {
				const dist = Math.hypot(head.x - food.x, head.y - food.y);
				if (dist < 12) {
					localScore++;
					setScore(localScore);
					speed += 0.1;
					for (let i = 0; i < 10; i++) {
						snake.push({ ...snake[snake.length - 1] });
					}
					return false;
				}
				return true;
			});

			if (checkBotCollisionWithPlayer()) {
				spawnFoodFromBot();
				botSnake = [];
			}

			if (botSnake.length === 0) {
				botSnake = [
					{
						x: Math.random() * 500 - 250,
						y: Math.random() * 500 - 250,
					},
				];
				botDirection = Math.random() * 2 * Math.PI;
			}

			drawBackground(snake[0].x, snake[0].y);
			drawFood();
			drawSnake();
			drawBotSnake();

			requestAnimationFrame(loop);
		}

		const bgImg = new Image();
		bgImg.src = bgImgUrl;
		bgImg.onload = () => {
			bgPattern = bgImg;
			loop();
		};

		return () => {
			window.removeEventListener('resize', resizeCanvas);
		};
	}, []);

	return { canvasRef, score };
};

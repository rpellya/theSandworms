import { useEffect, useRef, useState } from 'react';
import { TGameState } from './types';
import { snakeSkins } from 'consts/snakeSkins';

/**
 * Генерирует случайную мордочку змейки
 */
const totalFaces = 14;
function getRandomFaceUrl() {
	const faceNumber = String(
		Math.floor(Math.random() * totalFaces) + 1,
	).padStart(3, '0');
	return `/faces/face-${faceNumber}.webp`;
}

/**
 * Генерирует случайный паттерн для тела змейки
 */
function getRandomSkin() {
	const colors = snakeSkins[Math.floor(Math.random() * snakeSkins.length)];
	const stripePattern = colors.map(() => Math.floor(Math.random() * 20) + 4); // длины от 2 до 5
	const patternLength = stripePattern.reduce((sum, val) => sum + val, 0);

	function getColorForSegment(index: number): string {
		let i = index % patternLength;
		for (
			let patternIndex = 0;
			patternIndex < stripePattern.length;
			patternIndex++
		) {
			const len = stripePattern[patternIndex];
			if (i < len) {
				return colors[patternIndex % colors.length];
			}
			i -= len;
		}
		return colors[0];
	}

	return { colors, stripePattern, getColorForSegment };
}

type UseSnakeGameParams = {
	backgroundUrl: string;
	gameState: TGameState;
	onGameOver?: (score?: number) => void;
};

const playerSkin = getRandomSkin();
const botSkin = getRandomSkin();
const playerFaceUrl = getRandomFaceUrl();
const botFaceUrl = getRandomFaceUrl();

export const useSnakeGame = ({
	gameState,
	onGameOver,
	backgroundUrl,
}: UseSnakeGameParams) => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null);
	const playerFace = useRef<HTMLImageElement | null>(null);
	const botFace = useRef<HTMLImageElement | null>(null);
	const playerFaceRef = useRef<HTMLImageElement | null>(null);
	const botFaceRef = useRef<HTMLImageElement | null>(null);
	const bgPatternRef = useRef<HTMLImageElement | null>(null);
	const [score, setScore] = useState(0);

	useEffect(() => {
		// Игрок
		const playerFaceImg = new Image();
		playerFaceImg.src = playerFaceUrl;
		playerFaceImg.onload = () => (playerFaceRef.current = playerFaceImg);
		playerFace.current = playerFaceImg;

		// Бот
		const botFaceImg = new Image();
		botFaceImg.src = botFaceUrl;
		botFaceImg.onload = () => (botFaceRef.current = botFaceImg);
		botFace.current = botFaceImg;
	}, []);

	useEffect(() => {
		const img = new Image();
		img.src = backgroundUrl;
		img.onload = () => {
			bgPatternRef.current = img;
		};
	}, [backgroundUrl]);

	const snakeLength = 30;
	const botLength = 45;

	const arenaRadius = 1000;

	const initialSnake = [{ x: 0, y: 0 }];
	const initialBotSnake = [{ x: 100, y: 100 }];
	const initialSpeed = 1.5;

	// Используем useRef для состояний, которые меняются в игре
	const snakeRef = useRef([{ x: 0, y: 0 }]);
	const foodsRef = useRef([{ x: 0, y: 0 }]);
	const speedRef = useRef(1.5);
	const snakeWidthRef = useRef(12);
	const botSnakeWidthRef = useRef(12);
	const botSnakeRef = useRef([{ x: 100, y: 100 }]);
	const botDirectionRef = useRef(Math.random() * 2 * Math.PI);
	const localScoreRef = useRef(0);
	const playerSkinRef = useRef(getRandomSkin());
	const botSkinRef = useRef(getRandomSkin());

	const resetGame = () => {
		playerSkinRef.current = getRandomSkin();
		botSkinRef.current = getRandomSkin();

		const newPlayerFaceUrl = getRandomFaceUrl();
		const newPlayerFaceImg = new Image();
		newPlayerFaceImg.src = newPlayerFaceUrl;
		newPlayerFaceImg.onload = () => {
			playerFaceRef.current = newPlayerFaceImg;
		};
		playerFace.current = newPlayerFaceImg;

		const newBotFaceUrl = getRandomFaceUrl();
		const newBotFaceImg = new Image();
		newBotFaceImg.src = newBotFaceUrl;
		newBotFaceImg.onload = () => {
			botFaceRef.current = newBotFaceImg;
		};
		botFace.current = newBotFaceImg;

		// остальной reset
		snakeRef.current = [...initialSnake];
		botSnakeRef.current = [...initialBotSnake];
		speedRef.current = initialSpeed;
		botDirectionRef.current = Math.random() * 2 * Math.PI;
		foodsRef.current = [];
		localScoreRef.current = 0;
		setScore(0);
	};

	type Behaviour = { update: () => boolean; drawExtra: () => void };

	useEffect(() => {
		const stateBehavior: Record<TGameState, Behaviour> = {
			starting: {
				update() {
					return false;
				},
				drawExtra() {
					drawWalls();
				},
			},
			playing: {
				update() {
					updateSnake();
					updateBotSnake();
					return handleCollisionsAndFood(); // всё, что раньше было в if (playing) …
				},
				drawExtra() {
					// то, что в playing & paused, но не в idle
					drawWalls();
					drawFood();
				},
			},

			idle: {
				update() {
					updateBotSnake();
					return false;
				},
				drawExtra() {
					/* ничего лишнего */
				},
			},

			paused: {
				// пример третьего режима
				update() {
					return false;
				},
				drawExtra() {
					drawWalls();
					drawFood();
				},
			},
			finished: {
				update() {
					return false;
				},
				drawExtra() {},
			},
		} as const;

		const canvas = canvasRef.current;
		let animationId: number;
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

		const onMouseMove = (e: MouseEvent) => {
			mouse.x = e.clientX;
			mouse.y = e.clientY;
		};

		document.addEventListener('mousemove', onMouseMove);

		function spawnFood() {
			const range = 500;
			const snake = snakeRef.current;
			return {
				x: snake[0].x + (Math.random() - 0.5) * range,
				y: snake[0].y + (Math.random() - 0.5) * range,
			};
		}

		// Инициализация еды, если пусто
		if (foodsRef.current.length === 0) foodsRef.current.push(spawnFood());

		function updateSnake() {
			const snake = snakeRef.current;
			const head = snake[0];
			const dx = mouse.x - center.x;
			const dy = mouse.y - center.y;
			const angle = Math.atan2(dy, dx);
			const newX = head.x + Math.cos(angle) * speedRef.current;
			const newY = head.y + Math.sin(angle) * speedRef.current;
			snake.unshift({ x: newX, y: newY });
			if (snake.length > snakeLength) snake.pop();
		}

		function updateBotSnake() {
			const botSnake = botSnakeRef.current;
			if (!botSnake.length) return;
			const head = botSnake[0];
			if (Math.random() < 0.2) {
				botDirectionRef.current += (Math.random() - 0.6) * 0.6;
			}
			const newX = head.x + Math.cos(botDirectionRef.current) * 1;
			const newY = head.y + Math.sin(botDirectionRef.current) * 1;
			botSnake.unshift({ x: newX, y: newY });
			if (botSnake.length > botLength) botSnake.pop();
		}

		function drawWalls() {
			if (!ctx) return;

			const snakeHead = snakeRef.current[0];
			const offsetX = center.x - snakeHead.x;
			const offsetY = center.y - snakeHead.y;

			ctx.lineWidth = 5;
			ctx.strokeStyle = 'black';
			ctx.beginPath();
			ctx.arc(offsetX, offsetY, arenaRadius, 0, Math.PI * 2);
			ctx.stroke();
		}
		function drawBackground(offsetX: number, offsetY: number) {
			if (!canvas || !ctx || !bgPatternRef.current) return;
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
						bgPatternRef.current,
						Math.floor(x),
						Math.floor(y),
						patternSize,
						patternSize,
					);
				}
			}
		}

		function drawSnake() {
			if (!ctx) return;
			const snake = snakeRef.current;

			for (let i = snake.length - 1; i > 0; i--) {
				const part = snake[i];
				const screenX = center.x + (part.x - snake[0].x);
				const screenY = center.y + (part.y - snake[0].y);

				const color = playerSkin.getColorForSegment(i);

				ctx.beginPath();
				ctx.arc(
					screenX,
					screenY,
					snakeWidthRef.current,
					0,
					Math.PI * 2,
				);
				ctx.fillStyle = color;
				ctx.fill();
			}

			// Голова змейки — с лицом или запасной круг
			const playerFaceImg = playerFaceRef.current;
			if (playerFaceImg && playerFaceImg.complete) {
				const head = snake[0];
				const neck = snake[1] || head;
				const dx = head.x - neck.x;
				const dy = head.y - neck.y;
				const angle = Math.atan2(dy, dx) - Math.PI / 2;
				const faceSize = snakeWidthRef.current * 2;

				ctx.save();
				ctx.translate(center.x, center.y);
				ctx.rotate(angle);
				ctx.drawImage(
					playerFaceImg,
					-faceSize / 2,
					-faceSize / 2,
					faceSize,
					faceSize,
				);
				ctx.restore();
			} else {
				ctx.beginPath();
				ctx.arc(
					center.x,
					center.y,
					snakeWidthRef.current,
					0,
					Math.PI * 2,
				);
				ctx.fillStyle = '#a10';
				ctx.fill();
			}
		}

		function drawBotSnake() {
			if (!ctx) return;
			const botSnake = botSnakeRef.current;
			if (botSnake.length === 0) return;

			const snake = snakeRef.current;

			for (let i = botSnake.length - 1; i > 0; i--) {
				const part = botSnake[i];
				const screenX = center.x + (part.x - snake[0].x);
				const screenY = center.y + (part.y - snake[0].y);

				const color = botSkin.getColorForSegment(i);

				ctx.beginPath();
				ctx.arc(
					screenX,
					screenY,
					botSnakeWidthRef.current,
					0,
					Math.PI * 2,
				);
				ctx.fillStyle = color;
				ctx.fill();
			}

			const head = botSnake[0];
			const neck = botSnake[1] || head;
			const headX = center.x + (head.x - snake[0].x);
			const headY = center.y + (head.y - snake[0].y);

			const botFaceImg = botFaceRef.current;
			if (botFaceImg && botFaceImg.complete) {
				const dx = head.x - neck.x;
				const dy = head.y - neck.y;
				const angle = Math.atan2(dy, dx) - Math.PI / 2;
				const faceSize = botSnakeWidthRef.current * 2;

				ctx.save();
				ctx.translate(headX, headY);
				ctx.rotate(angle);
				ctx.drawImage(
					botFaceImg,
					-faceSize / 2,
					-faceSize / 2,
					faceSize,
					faceSize,
				);
				ctx.restore();
			} else {
				ctx.beginPath();
				ctx.arc(headX, headY, 12, 0, Math.PI * 2);
				ctx.fillStyle = '#a10';
				ctx.fill();
			}
		}

		function checkBotCollisionWithPlayer() {
			const botSnake = botSnakeRef.current;
			const snake = snakeRef.current;
			const botHead = botSnake[0];
			for (let i = 5; i < snake.length; i++) {
				const part = snake[i];
				const dist = Math.hypot(botHead.x - part.x, botHead.y - part.y);
				if (dist < snakeWidthRef.current) return true;
			}
			return false;
		}

		function checkPlayerCollisionWithBot(): boolean {
			const snake = snakeRef.current; // игрок
			const botSnake = botSnakeRef.current; // бот
			const head = snake[0]; // голова игрока

			// пропустим первые 5 сегментов бота, чтобы не ловить «касание голов»
			for (let i = 5; i < botSnake.length; i++) {
				const part = botSnake[i];
				const dist = Math.hypot(head.x - part.x, head.y - part.y);
				if (dist < botSnakeWidthRef.current) return true;
			}
			return false;
		}

		function checkWallCollision() {
			const head = snakeRef.current[0];
			const dist = Math.hypot(head.x, head.y); // расстояние от (0,0)
			return dist + snakeWidthRef.current > arenaRadius;
		}

		function checkBotWallCollision(): boolean {
			const botSnake = botSnakeRef.current;
			if (botSnake.length === 0) return false;
			const head = botSnakeRef.current[0];
			const dist = Math.hypot(head.x, head.y);
			return dist + botSnakeWidthRef.current > arenaRadius;
		}

		function checkBotWallCollision(): boolean {
			const botSnake = botSnakeRef.current;
			if (botSnake.length === 0) return false;
			const head = botSnake[0];
			const walls = wallsRef.current;

			for (const wall of walls) {
				if (
					head.x + botSnakeWidthRef.current > wall.x &&
					head.x - botSnakeWidthRef.current < wall.x + wall.width &&
					head.y + botSnakeWidthRef.current > wall.y &&
					head.y - botSnakeWidthRef.current < wall.y + wall.height
				) {
					return true; // бот врезался
				}
			}
			return false;
		}

		function spawnFoodFromBot() {
			const botSnake = botSnakeRef.current;
			const foods = foodsRef.current;
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

		function drawFood() {
			if (!ctx) return;
			const foods = foodsRef.current;
			const snake = snakeRef.current;
			for (const food of foods) {
				const screenX = center.x + (food.x - snake[0].x);
				const screenY = center.y + (food.y - snake[0].y);
				ctx.beginPath();
				ctx.arc(screenX, screenY, 10, 0, Math.PI * 2);
				ctx.fillStyle = 'blue';
				ctx.fill();
			}
		}

		/** Обрабатываем всё, что связано с едой и столкновениями.
		 *  Возвращает true, если игра закончилась (чтобы оборвать кадр).
		 */
		function handleCollisionsAndFood(): boolean {
			const snake = snakeRef.current;
			const foods = foodsRef.current;
			const head = snake[0];

			/*––– ЕДА –––*/
			foodsRef.current = foods.filter((food) => {
				const dist = Math.hypot(head.x - food.x, head.y - food.y);
				if (dist < 12) {
					localScoreRef.current++;
					setScore(localScoreRef.current);

					speedRef.current += 0.1;
					snakeWidthRef.current += 0.1;

					// «растим» змею на 10 сегментов
					for (let i = 0; i < 10; i++) {
						snake.push({ ...snake[snake.length - 1] });
					}
					return false; // еду съели – удаляем
				}
				return true; // оставляем
			});

			// если съели последнюю еду, сразу создаём новую
			if (foodsRef.current.length === 0) {
				foodsRef.current.push(spawnFood());
			}

			/*––– БОТ vs ИГРОК –––*/
			if (checkBotCollisionWithPlayer()) {
				spawnFoodFromBot(); // бот рассыпается едой
				botSnakeRef.current = [];
			}

			/*––– ИГРОК vs БОТ –––*/
			if (checkPlayerCollisionWithBot()) {
				if (typeof onGameOver === 'function')
					onGameOver(localScoreRef.current);
				return true; // прерываем цикл – игра окончена
			}

			/*––– СТЕНЫ –––*/
			if (checkWallCollision()) {
				if (typeof onGameOver === 'function')
					onGameOver(localScoreRef.current);
				return true; // игра окончена – остановим кадр
			}

			/*––– СТЕНЫ vs БОТ –––*/
			if (checkBotWallCollision()) {
				spawnFoodFromBot();
				botSnakeRef.current = [];
			}

			/*––– РЕСПАВН БОТА (если съели) –––*/
			if (botSnakeRef.current.length === 0) {
				botSnakeRef.current = [
					{
						x: Math.random() * 500 - 250,
						y: Math.random() * 500 - 250,
					},
				];
				botDirectionRef.current = Math.random() * 2 * Math.PI;
			}

			return false; // игра продолжается
		}

		function loop() {
			if (!canvas || !ctx) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const isStopped = stateBehavior[gameState].update();
			if (isStopped) return; // прерываем кадр

			drawBackground(snakeRef.current[0].x, snakeRef.current[0].y);
			stateBehavior[gameState].drawExtra();

			if (gameState === 'idle') {
				drawBotSnake();
			}

			if (gameState === 'playing') {
				drawSnake();
				drawBotSnake();
			}

			animationId = requestAnimationFrame(loop);
		}
		loop();

		return () => {
			window.removeEventListener('resize', resizeCanvas);
			document.removeEventListener('mousemove', onMouseMove);
			if (animationId) cancelAnimationFrame(animationId);
		};
	}, [gameState]);

	return { canvasRef, score, resetGame };
};

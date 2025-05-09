import { memo, useEffect, useRef, useState } from 'react';

export const SnakeGame = memo(() => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const mouse = { x: canvas.width / 2, y: canvas.height / 2 };
        const center = { x: canvas.width / 2, y: canvas.height / 2 };
        const snake = [{ x: 0, y: 0 }];
        const snakeLength = 30;
        let speed = 1;
        let food = spawnFood();
        let score = 0;
        let bgPattern: HTMLImageElement | null = null;

        document.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

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

        function drawBackground(offsetX: number, offsetY: number) {
            const canvas = canvasRef.current;
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

        function drawSnake() {
            if (!ctx) return;
            for (let i = snake.length - 1; i > 0; i--) {
                const part = snake[i];
                const screenX = center.x + (part.x - snake[0].x);
                const screenY = center.y + (part.y - snake[0].y);

                ctx.beginPath();
                ctx.arc(screenX, screenY, 6, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${i * 3}, 100%, 50%)`;
                ctx.fill();
            }

            ctx.beginPath();
            ctx.arc(center.x, center.y, 6, 0, Math.PI * 2);
            ctx.fillStyle = '#a10';
            ctx.fill();
        }

        function spawnFood() {
            const range = 500;
            return {
                x: snake[0].x + (Math.random() - 0.5) * range,
                y: snake[0].y + (Math.random() - 0.5) * range,
            };
        }

        function drawFood() {
            if (!ctx) return;
            const screenX = center.x + (food.x - snake[0].x);
            const screenY = center.y + (food.y - snake[0].y);

            ctx.beginPath();
            ctx.arc(screenX, screenY, 6, 0, Math.PI * 2);
            ctx.fillStyle = 'blue';
            ctx.fill();
        }

        function loop() {
            if (!canvas || !ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            updateSnake();

            const head = snake[0];
            if (Math.hypot(head.x - food.x, head.y - food.y) < 12) {
                score++;
                setScore(score);
                speed += 0.1;
                food = spawnFood();
                for (let i = 0; i < 10; i++) {
                    snake.push({ ...snake[snake.length - 1] });
                }
            }

            drawBackground(snake[0].x, snake[0].y);
            drawFood();
            drawSnake();
            requestAnimationFrame(loop);
        }

        const bgImg = new Image();
        bgImg.src = '/src/assets/bg/bg-002.webp';
        bgImg.onload = () => {
            bgPattern = bgImg;
            loop();
        };
    }, []);

    return (
        <div style={{ position: 'relative' }}>
            <div
                style={{
                    position: 'absolute',
                    right: 10,
                    top: 10,
                    padding: 5,
                    background: 'rgba(0,0,0,0.5)',
                    color: 'orange',
                    zIndex: 1,
                }}
            >
                Score:
                <span>{score}</span>
            </div>
            <canvas ref={canvasRef} style={{ display: 'block' }} />
        </div>
    );
});

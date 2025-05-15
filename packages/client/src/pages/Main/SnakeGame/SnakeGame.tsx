import { memo } from 'react';
import { useSnakeGame } from './useSnakeGame';
import cls from './SnakeGame.module.scss';

export const SnakeGame = memo(() => {
    const { canvasRef, score } = useSnakeGame();

    return (
        <div className={cls.snakeGame}>
            <div className={cls.snakeGame__score}>
                Очки:
                <span>{score}</span>
            </div>
            <canvas ref={canvasRef} className={cls.snakeGame__canvas} />
        </div>
    );
});

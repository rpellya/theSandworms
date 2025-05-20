import React, { memo, useEffect, useState } from 'react';
import { useSnakeGame } from './useSnakeGame';
import cls from './SnakeGame.module.scss';
import { GameMenu } from './GameMenu/GameMenu';
import { Button } from 'components/Button';

interface SnakeGameProps {
    onExit: () => void;
}

export const SnakeGame: React.FC<SnakeGameProps> = memo(({ onExit }) => {
    const [gameState, setGameState] = useState<
        'starting' | 'playing' | 'paused' | 'finished'
    >('starting');
    const { canvasRef, score } = useSnakeGame(gameState);
    const [countdown, setCountdown] = useState<number | null>(5);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setGameState((prev) =>
                    prev === 'playing' ? 'paused' : 'playing',
                );
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (gameState !== 'starting') return;
        if (countdown === null) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev === 1) {
                    clearInterval(timer);
                    setCountdown(null);
                    setGameState('playing');
                    return null;
                }
                return prev ? prev - 1 : null;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [gameState]);

    const handleResumeClick = () => {
        setGameState('playing');
    };

    return (
        <div className={cls.snakeGame}>
            <div className={cls.snakeGame__score}>
                Очки: <span>{score}</span>
            </div>

            <canvas ref={canvasRef} className={cls.snakeGame__canvas} />

            {gameState === 'starting' && countdown !== null && (
                <div className={cls.snakeGame__pauseOverlay}>
                    <GameMenu>
                        <div className={cls.gameBrief}>
                            <p>Собирай еду и не сдавайся</p>
                            <h1>{countdown}</h1>
                        </div>
                    </GameMenu>
                </div>
            )}
            {gameState === 'paused' && (
                <div className={cls.snakeGame__pauseOverlay}>
                    <GameMenu>
                        <h1>Пауза</h1>
                        <div>
                            <ul className={cls.GameList}>
                                <li>
                                    <Button
                                        className={cls.buttons}
                                        onClick={handleResumeClick}
                                    >
                                        Продолжить
                                    </Button>
                                </li>
                                <li>
                                    <Button className={cls.buttons}>
                                        Начать заново
                                    </Button>
                                </li>
                                <li>
                                    <Button
                                        className={cls.buttons}
                                        onClick={onExit}
                                    >
                                        В главное меню
                                    </Button>
                                </li>
                                <li>
                                    <Button className={cls.buttons}>
                                        Имитация окончания
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </GameMenu>
                </div>
            )}
        </div>
    );
});

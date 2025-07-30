import React, { memo, useEffect, useState } from 'react';
import {
    RATING_FIELD_NAME,
    useSendSchoreMutation,
} from 'api/leaderBoard/leaderBoardApi';
import { useSnakeGame } from './useSnakeGame';
import cls from './SnakeGame.module.scss';
import { GameMenu } from './GameMenu';
import { Button } from 'components/Button';
import { TGameState } from './types';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

interface SnakeGameProps {
    backgroundUrl: string;
    onExit: () => void;
    onGameOver: (score?: number) => void;
}

export const SnakeGame: React.FC<SnakeGameProps> = memo(
    ({ onExit, onGameOver, backgroundUrl }) => {
        const [sendSchoreApi] = useSendSchoreMutation();
        const [gameState, setGameState] = useState<TGameState>('starting');

        const { canvasRef, score, resetGame } = useSnakeGame({
            gameState,
            onGameOver,
            backgroundUrl,
        });
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
            if ('finished' === gameState) {
                sendSchore(score);
                onGameOver(score);
            }
        }, [gameState, score, onGameOver]);

        const login = useSelector(
            (state: RootState) =>
                state.userReducer.userInfo?.login ?? 'Anonimous User',
        );
        const sendSchore = async (schore: number) => {
            const data = {
                data: {
                    [RATING_FIELD_NAME]: schore,
                    login: login,
                },
                ratingFieldName: RATING_FIELD_NAME,
            };

            try {
                await sendSchoreApi(data);
            } catch (error) {
                console.log(`ERROR: ${error}`);
            }
        };

        const handleResumeClick = () => {
            setGameState('playing');
        };

        const handleFinishClick = () => setGameState('finished');

        const handleRestartClick = () => {
            resetGame();
            setCountdown(5);
            setGameState('starting');
        };

        return (
            <div className={cls.snakeGame}>
                <div className={cls.snakeGame__score}>
                    Очки: <span>{score}</span>
                </div>
                <canvas
                    ref={canvasRef}
                    className={cls.snakeGame__canvas}
                    data-testid="canvas"
                />
                {gameState === 'starting' && countdown !== null && (
                    <div className={cls.snakeGame__pauseOverlay}>
                        <GameMenu>
                            <div className={cls.gameBrief}>
                                <p>Собирай еду и не сдавайся</p>
                                <p>Для вызова меню нажми ESC</p>
                                <Button
                                    onClick={handleResumeClick}
                                    className={cls.buttons}
                                >
                                    Начать
                                </Button>
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
                                        <Button
                                            onClick={handleRestartClick}
                                            className={cls.buttons}
                                        >
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
                                        <Button
                                            onClick={handleFinishClick}
                                            className={cls.buttons}
                                        >
                                            Имитация окончания
                                        </Button>
                                    </li>
                                </ul>
                            </div>
                        </GameMenu>
                    </div>
                )}

                {gameState === 'finished' && (
                    <div className={cls.snakeGame__pauseOverlay}>
                        <GameMenu>
                            <h1>Игра окончена</h1>
                            <p className={cls.scoreResult}>
                                Ты набрал: <strong>{score}</strong> очков
                            </p>
                            <ul className={cls.GameList}>
                                <li>
                                    <Button
                                        className={cls.buttons}
                                        onClick={handleRestartClick}
                                    >
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
                            </ul>
                        </GameMenu>
                    </div>
                )}
            </div>
        );
    },
);

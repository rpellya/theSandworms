import React, { memo, useState } from 'react';

import { useSnakeGame } from './useSnakeGame';
import cls from './SnakeGame.module.scss';

import { TGameState } from './types';

interface SnakeGameMainProps {
    backgroundUrl: string;
}

export const SnakeGameMain: React.FC<SnakeGameMainProps> = memo(
    ({ backgroundUrl }) => {
        const [gameState, setGameState] = useState<TGameState>('idle');

        const { canvasRef } = useSnakeGame({
            gameState,
            backgroundUrl,
        });

        return (
            <canvas
                ref={canvasRef}
                className={cls.snakeGame__canvas}
                style={{ position: 'absolute', inset: 0 }}
            />
        );
    },
);

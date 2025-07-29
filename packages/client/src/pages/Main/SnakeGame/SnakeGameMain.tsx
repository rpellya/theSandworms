import React, { memo, useState } from 'react';

import { useSnakeGame } from './useSnakeGame';
import cls from './SnakeGame.module.scss';

import { TGameState } from './types';

export const SnakeGameMain: React.FC = memo(() => {
    const [gameState, setGameState] = useState<TGameState>('idle');

    const { canvasRef } = useSnakeGame({
        gameState,
    });

    return (
        <canvas
            ref={canvasRef}
            className={cls.snakeGame__canvas}
            style={{ position: 'absolute', inset: 0 }}
        />
    );
});

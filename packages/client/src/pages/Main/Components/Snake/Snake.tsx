import React from 'react';
import cls from './snake.module.scss';
import snakeLogo from '/src/assets/img/snakeImage.webp';

interface SnakeProps {
    className?: string;
}

export const Snake: React.FC<SnakeProps> = ({ className }) => {
    return (
        <div className={`${cls.Snake} ${className}`}>
            <img src={snakeLogo} alt="Snake" className={cls.snake} />
        </div>
    );
};

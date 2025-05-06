import React from 'react';
import cls from './snake.module.scss';
import snakeLogo from '/src/assets/img/snakeImage.webp';

interface SnakeImageProps {
    className?: string;
}

export const SnakeImage: React.FC<SnakeImageProps> = ({ className }) => {
    return (
        <div className={`${cls.Snake} ${className}`}>
            <img src={snakeLogo} alt="Snake" className={cls.snakeImage} />
        </div>
    );
};

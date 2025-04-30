import React from 'react';
import s from './snake.module.scss';

interface ISnakeProps {
    className?: string;
}

export const Snake: React.FC<ISnakeProps> = ({ className }) => {
    return (
        <div className={`${s.Snake} ${className}`}>
            <img
                src="/src/assets/img/snake.webp"
                alt="Snake"
                className={s.snake}
            />
        </div>
    );
};

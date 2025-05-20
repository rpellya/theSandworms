import React, { ReactNode } from 'react';
import cls from './GameMenu.module.scss';

interface GameMenuProps {
    className?: string;
    children: ReactNode;
}

export const GameMenu: React.FC<GameMenuProps> = ({ className, children }) => {
    return <div className={`${cls.GameMenu} ${className}`}>{children}</div>;
};

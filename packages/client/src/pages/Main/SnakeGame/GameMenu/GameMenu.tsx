import React, { ReactNode } from 'react';
import cls from './GameMenu.module.scss';
import { classNames as cn } from 'app/lib/classNames';

interface GameMenuProps {
    className?: string;
    children: ReactNode;
}

export const GameMenu: React.FC<GameMenuProps> = ({ className, children }) => {
    return <div className={cn(cls.GameMenu, {}, [className])}>{children}</div>;
};

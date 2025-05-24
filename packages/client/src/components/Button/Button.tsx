import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import cls from './Button.module.scss';

// Примеры которые можно использовать для стилей
export enum ButtonVariant {
    CLEAR = 'clear',
    CLEAR_INVERTED = 'clearInverted',
    OUTLINE = 'outline',
    OUTLINE_RED = 'outline_red',
    BACKGOUND = 'background',
    BACKGOUND_INVERTED = 'backgroundInverted',
}
// Примеры которые можно использовать для размеров
export enum ButtonSize {
    M = 'size_m',
    L = 'size_l',
    XL = 'size_xl',
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ButtonVariant;
    square?: boolean;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
}

/**
 * Компонент кнопки обернут в memo, потому что 99% содержимое кнопки это строка.
 */
export const Button: React.FC<ButtonProps> = memo(
    ({ children, ...otherProps }) => {
        return (
            <button
                className={cls.Button}
                type={otherProps.type || 'button'}
                {...otherProps}
            >
                {children}
            </button>
        );
    },
);

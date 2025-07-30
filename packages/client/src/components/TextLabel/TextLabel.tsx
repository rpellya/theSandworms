import cls from './TextLabel.module.scss';
import { classNames } from 'app/lib/classNames';
import { memo } from 'react';

interface TextLabelProps extends React.HTMLAttributes<HTMLParagraphElement> {
    text: string;
    className?: string;
    htmlFor?: string;
}

export const TextLabel: React.FC<TextLabelProps> = memo(
    ({ className, text, ...otherProps }) => {
        return (
            <p
                className={classNames(cls.textLabel, {}, [className])}
                {...otherProps}
            >
                {text}
            </p>
        );
    },
);

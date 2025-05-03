import './Link.scss';
import { LinkHTMLAttributes, MouseEventHandler } from 'react';
import { memo } from 'react';

interface LinkProps extends LinkHTMLAttributes<HTMLLinkElement> {
    handleClick: MouseEventHandler;
    text: string;
    className?: string;
}

export const Link: React.FC<LinkProps> = memo(
    ({ handleClick, className, text }) => {
        return (
            <a className={className} onClick={handleClick}>
                {text}
            </a>
        );
    },
);

import cls from './AppLink.module.scss';
import { classNames } from 'app/lib/classNames';
import { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface AppLinkProps extends LinkProps {
    className?: string;
    text?: string; // необязательный текст, если не передан — используется children
}

export const AppLink: React.FC<AppLinkProps> = memo(
    ({ className, text, children, ...otherProps }) => {
        return (
            <Link
                className={classNames(cls.applink, {}, [className])}
                {...otherProps}
            >
                {text ?? children}
            </Link>
        );
    },
);

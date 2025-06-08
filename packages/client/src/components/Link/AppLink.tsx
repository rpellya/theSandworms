import cls from './AppLink.module.scss';
import { classNames } from 'app/lib/classNames';
import { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface AppLinkProps extends LinkProps {
    className?: string;
    text?: string; // необязательный текст, если не передан — используется ''. У react-компонента Link нет props-a children
    to?: string;
}

export const AppLink: React.FC<AppLinkProps> = memo(
    ({ className, text, ...otherProps }) => {
        return (
            <Link
                className={classNames(cls.applink, {}, [className])}
                {...otherProps}
            >
                {text ?? ''}
            </Link>
        );
    },
);

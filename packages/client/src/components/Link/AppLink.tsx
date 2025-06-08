import cls from './AppLink.module.scss';
import { classNames } from 'app/lib/classNames';
import { memo } from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ReactNode } from 'react';

interface AppLinkProps extends LinkProps {
    className?: string;
    text?: string;
    children?: ReactNode;
    to: string;
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

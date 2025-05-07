import cls from './AppForm.module.scss';
import { FormHTMLAttributes, memo } from 'react';

interface AppFormProps extends FormHTMLAttributes<HTMLFormElement> {
    className?: string;
}

export const AppForm: React.FC<AppFormProps> = memo(
    ({ children, method, ...otherProps }) => {
        return (
            <form className={cls.appForm} {...otherProps} method={method}>
                {children}
            </form>
        );
    },
);

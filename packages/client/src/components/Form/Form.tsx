import cls from './Form.module.scss';
import { FormHTMLAttributes, memo } from 'react';

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    className?: string;
}

export const Form: React.FC<FormProps> = memo(
    ({ children, method, ...otherProps }) => {
        return (
            <form className={cls.appForm} {...otherProps} method={method}>
                {children}
            </form>
        );
    },
);

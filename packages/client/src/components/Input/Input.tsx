import { ChangeEvent, InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';
import { classNames } from 'app/lib/classNames';

interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    labelClassName?: string;
    inputClassName?: string;
    type: string;
    inputLabel: string;
    inputId?: string
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = memo(
    ({ labelClassName, inputClassName, inputLabel, type, inputId, ...otherProps }) => {
        return (
            <div className={cls.appInput__inputContainer}>
                <label
                    className={classNames(cls.appInput__label, {}, [
                        labelClassName,
                    ])}
                    htmlFor={inputId}
                >
                    {inputLabel}
                </label>
                <input
                    className={classNames(cls.appInput, {}, [inputClassName])}
                    type={type}
                    id={inputId}
                    {...otherProps}
                />
            </div>
        );
    },
);

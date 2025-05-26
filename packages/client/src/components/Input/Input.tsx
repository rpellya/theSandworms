import { forwardRef, ChangeEvent, InputHTMLAttributes, memo } from 'react';
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
    forwardRef<HTMLInputElement, InputProps>(
        (
            { labelClassName, inputClassName, inputLabel, type, inputId, ...otherProps },
            ref,
        ) => {
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
                        className={classNames(cls.appInput, {}, [
                            inputClassName,
                        ])}
                        ref={ref}
                        type={type}
                        name={inputId}
                        {...otherProps}
                    />
                </div>
            );
        },
    ),
);

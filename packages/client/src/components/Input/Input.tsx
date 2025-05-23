import { forwardRef, ChangeEvent, InputHTMLAttributes, memo } from 'react';
import cls from './Input.module.scss';
import { classNames } from 'app/lib/classNames';
import { TextLabel } from 'components/TextLabel';

interface InputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    labelClassName?: string;
    inputClassName?: string;
    type: string;
    inputLabel: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = memo(
    forwardRef<HTMLInputElement, InputProps>(
        (
            { labelClassName, inputClassName, inputLabel, type, ...otherProps },
            ref,
        ) => {
            return (
                <div className={cls.appInput__inputContainer}>
                    <TextLabel
                        className={classNames(cls.appInput__label, {}, [
                            labelClassName,
                        ])}
                        text={inputLabel}
                    />
                    <input
                        className={classNames(cls.appInput, {}, [
                            inputClassName,
                        ])}
                        ref={ref}
                        type={type}
                        {...otherProps}
                    />
                </div>
            );
        },
    ),
);

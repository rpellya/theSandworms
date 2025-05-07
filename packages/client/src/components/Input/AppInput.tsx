import { memo } from 'react';
import cls from './AppInput.module.scss';
import { classNames } from 'app/lib/classNames';
import { TextLabel } from 'components/TextLabel';

interface InputProps extends React.HTMLAttributes<HTMLInputElement> {
    labelClassName?: string;
    inputClassName?: string;
    type: string;
    inputLabel: string;
}

export const Input: React.FC<InputProps> = memo(
    ({ labelClassName, inputClassName, inputLabel, type, ...otherProps }) => {
        return (
            <div className={cls.appInput__inputContainer}>
                <TextLabel
                    className={classNames(cls.appInput__label, {}, [
                        labelClassName,
                    ])}
                    text={inputLabel}
                />
                <input
                    className={classNames(cls.appInput, {}, [inputClassName])}
                    type={type}
                    {...otherProps}
                />
            </div>
        );
    },
);

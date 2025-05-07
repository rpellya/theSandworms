import { memo } from 'react';
import cls from './AppInput.module.scss';
import { classNames } from 'app/lib/classNames';
import { TextLabel } from 'components/TextLabel';

interface AppInputProps extends React.HTMLAttributes<HTMLInputElement> {
    labelClassName?: string;
    inputClassName?: string;
    inputType: string;
    inputLabel: string;
}

export const AppInput: React.FC<AppInputProps> = memo(
    ({
        labelClassName,
        inputClassName,
        inputLabel,
        inputType,
        ...otherProps
    }) => {
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
                    type={inputType}
                    {...otherProps}
                ></input>
            </div>
        );
    },
);

import React, { forwardRef, InputHTMLAttributes, memo } from 'react';
import cls from './Field.module.scss';

interface FieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    fieldName: string;
    errorMessage: string;
    fieldType: string;
    disabled: boolean;
}

export const Field: React.FC<FieldProps> = memo(
    forwardRef<HTMLInputElement, FieldProps>(
        (
            { fieldName, errorMessage, fieldType, disabled, ...otherProps },
            ref,
        ) => {
            return (
                <div className={cls.Field}>
                    <p className={cls.Field_name}>{fieldName}</p>
                    <div className={cls.Field_container}>
                        <input
                            ref={ref}
                            disabled={disabled}
                            className={cls.Field_container_input}
                            type={fieldType}
                            {...otherProps}
                        />
                        {errorMessage && (
                            <p className={cls.Field_container_errorMessage}>
                                {errorMessage}
                            </p>
                        )}
                    </div>
                </div>
            );
        },
    ),
);

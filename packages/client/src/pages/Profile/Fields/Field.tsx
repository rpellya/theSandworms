import React from 'react';
import style from './field.module.scss';
import { changeInput } from '../helpers/changeInput';

interface IFieldProps {
    fieldName: string;
    placeholder: string;
    fieldType: string;
    fieldKey: string;
    profileValues: Record<string, any>;
    setProfileValues: (value: any) => void;
    disabled: boolean;
}

const Field: React.FC<IFieldProps> = ({
    fieldName,
    placeholder,
    fieldType,
    disabled,
    profileValues,
    setProfileValues,
    fieldKey,
}) => {
    return (
        <div className={style.field}>
            <p className={style.field_name}>{fieldName}</p>
            <input
                onChange={(event) =>
                    changeInput(
                        { key: fieldKey, value: event.target.value },
                        setProfileValues,
                    )
                }
                disabled={disabled}
                className={style.field_input}
                type={fieldType}
                value={profileValues[fieldKey]}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Field;

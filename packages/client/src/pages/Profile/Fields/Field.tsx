import React from 'react';
import cls from './field.module.scss';
import { changeInput } from '../helpers/changeInput';
import { ProfileFieldKey, ProfileValues } from '../types';

interface FieldProps {
    fieldName: string;
    placeholder: string;
    fieldType: string;
    fieldKey: ProfileFieldKey;
    profileValues: ProfileValues;
    setProfileValues: React.Dispatch<React.SetStateAction<ProfileValues>>;
    disabled: boolean;
}

export const Field: React.FC<FieldProps> = ({
    fieldName,
    placeholder,
    fieldType,
    disabled,
    profileValues,
    setProfileValues,
    fieldKey,
}) => {
    return (
        <div className={cls.field}>
            <p className={cls.field_name}>{fieldName}</p>
            <input
                onChange={(event) =>
                    changeInput(
                        { key: fieldKey, value: event.target.value },
                        setProfileValues,
                    )
                }
                disabled={disabled}
                className={cls.field_input}
                type={fieldType}
                value={profileValues[fieldKey]}
                placeholder={placeholder}
            />
        </div>
    );
};

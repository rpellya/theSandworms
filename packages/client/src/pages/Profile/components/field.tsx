import React from 'react';
import style from './field.module.scss';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import { changeInput } from 'store/profile/profileSlice';
import { IFieldType } from '../types';

interface IFieldName {
    fieldName: string;
    placeholder: string;
    fieldType: string;
    value: string;
    key: string;
    disabled: boolean;
}

const Field = ({
    fieldName,
    placeholder,
    fieldType,
    // value,
    disabled,
    key,
}: IFieldName) => {
    const dispatch = useAppDispatch();
    const { profileState } = useAppSelector((state) => state.profile);
    const value = profileState.find((item: IFieldType) => item.key === key);
    return (
        <div className={style.field}>
            <p className={style.field_name}>{fieldName}</p>
            <input
                onChange={(event) =>
                    dispatch(changeInput({ key, value: event }))
                }
                disabled={disabled}
                className={style.field_input}
                type={fieldType}
                value={value?.value}
                placeholder={placeholder}
            />
        </div>
    );
};

export default Field;

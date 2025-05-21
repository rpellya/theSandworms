/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from 'components/Button';
import { memo, useEffect, useState } from 'react';
import cls from './Profile.module.scss';
import { updateIconProfile } from './helpers/updateIconProfile';
import { dictonariesFields } from './dictonariesFields';
import { profileValuesDict } from './consts/profileValuesDict';
import { AppLink } from 'components/Link/AppLink';
import { Field } from './Fields/Field';
import {
    useLazyGetAuthUserQuery,
    useLogoutApiMutation,
} from 'store/services/auth/authApi';
import { useNavigate } from 'react-router-dom';
import {
    usePuthUserMutation,
    useUpdateAvatarProfileMutation,
} from 'store/services/gameApi/rtk';
import { baseUrl } from 'consts/baseUrl';
import { logout } from './helpers/logout';
import { Form } from 'components/Form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { setUserInfo } from 'store/services/auth/userInfoSlice';
import { IUserInfo } from 'store/types';

/**
 * Оборачиваем в memo, чтобы при рендеринге этого компонента не перерисовывался весь дочерний контент
 */
export const Profile: React.FC = memo(() => {
    const [logoutApi] = useLogoutApiMutation();
    const [putUserApi] = usePuthUserMutation();
    const [updateAvatarProfile] = useUpdateAvatarProfileMutation();
    const [getUserData] = useLazyGetAuthUserQuery();
    const [disabled, setDisabled] = useState(true);
    const [textBtn, setTextBtn] = useState('Изменить');
    const [icon, setIcon] = useState('/avatar.svg');
    const [profileValues, setProfileValues] = useState<
        IUserInfo | Record<string, any>
    >(profileValuesDict);
    const { userInfo } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();
    const updateFunc = () => {
        setDisabled(!disabled);

        if (disabled) {
            setTextBtn('Сохранить');
        } else {
            setTextBtn('Изменить');
        }
        if (textBtn === 'Сохранить') {
            updateProfile();
        }
    };

    const updateProfile = () => {
        putUserApi(profileValues);
    };

    const handleUpload = async (file: File) => {
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            await updateAvatarProfile(formData).unwrap();
            getUserData();
        } catch (e) {
            console.error(e);
        }
    };
    useEffect(() => {
        if (userInfo) {
            dispatch(setUserInfo(userInfo));
            setIcon(`${baseUrl}/resources${userInfo.avatar}`);
            setProfileValues(userInfo);
        }
        getUserData().then((res) => dispatch(setUserInfo(res.data)));
    }, [userInfo, icon]);
    return (
        <div className={cls.profile}>
            <header className={cls.profile_header}>
                <AppLink
                    text="На главную"
                    to="/"
                    // to={RoutePath.main}
                    className={cls.profile_header_homeBtn}
                />

                <p
                    onClick={() => logout(() => logoutApi().unwrap(), navigate)}
                    className={cls.profile_header_logout}
                >
                    Выход
                </p>
            </header>
            <div className={cls.profile_container}>
                <h3>Профиль</h3>
                <img
                    onClick={() => updateIconProfile(setIcon, handleUpload)}
                    className={cls.profile_container_icon}
                    src={icon}
                    alt="icon"
                />
                <Form className={cls.profile_container_form}>
                    <div className={cls.profile_container_form_fields}>
                        {dictonariesFields.map((field) => (
                            <Field
                                fieldName={field.fieldName}
                                fieldType={field.fieldType}
                                key={field.key}
                                fieldKey={field.key}
                                placeholder={field.placeholder}
                                disabled={disabled}
                                profileValues={profileValues}
                                setProfileValues={setProfileValues}
                            />
                        ))}
                    </div>
                    <Button onClick={updateFunc}>{textBtn}</Button>
                </Form>
            </div>
        </div>
    );
});

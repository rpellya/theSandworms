import { Button } from 'components/Button';
import { memo, useCallback, useEffect, useState } from 'react';
import cls from './Profile.module.scss';
import { updateIconProfile } from './helpers/updateIconProfile';
import { dictonariesFields } from './dictonariesFields';
import { AppLink } from 'components/Link/AppLink';
import { Field } from './Fields/Field';
import {
    useLazyGetAuthUserQuery,
    useLogoutApiMutation,
} from 'api/auth/authApi';
import { useNavigate } from 'react-router-dom';
import {
    usePuthUserMutation,
    useUpdateAvatarProfileMutation,
} from 'api/gameApi/rtk';
import defaultIcon from 'assets/img/profileMockImg.webp';
import { baseUrl } from 'consts/baseUrl';
import { Form } from 'components/Form';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import { useForm } from 'react-hook-form';
import { userActions } from 'store/userInfoSlice';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { useAuth } from 'store/useAuth';

/**
 * Оборачиваем в memo, чтобы при рендеринге этого компонента не перерисовывался весь дочерний контент
 */
interface UserData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
    display_name: string;
}

export const Profile: React.FC = memo(() => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<UserData>({
        mode: 'onChange',
    });
    const [logoutApi] = useLogoutApiMutation();
    const [putUserApi] = usePuthUserMutation();
    const [updateAvatarProfile] = useUpdateAvatarProfileMutation();
    const [getUserData] = useLazyGetAuthUserQuery();

    const [disabled, setDisabled] = useState(true);
    const [textBtn, setTextBtn] = useState('Изменить');
    const [icon, setIcon] = useState(defaultIcon);

    const { userInfo } = useAppSelector((state) => state.userReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const updateFunc = () => {
        if (Object.keys(errors).length !== 0) {
            return;
        }
        setDisabled(!disabled);
        if (disabled) {
            setTextBtn('Сохранить');
        } else {
            setTextBtn('Изменить');
        }
    };

    const updateProfile = async (data: UserData) => {
        try {
            await putUserApi(data);
        } catch (error) {
            console.error(error);
        } finally {
            await getUserData();
        }
    };

    console.log('errors', errors);

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

    useAuth();

    const onLogout = useCallback(() => {
        logoutApi()
            .unwrap()
            .then((res) => {
                if (res === 'OK') {
                    navigate(RoutePath.login);
                    dispatch(userActions.logout());
                }
            })
            .catch((e) => console.error('Ошибка при выходе:', e));
    }, [dispatch]);

    useEffect(() => {
        if (userInfo) {
            dispatch(userActions.setUserInfo(userInfo));
            reset(userInfo);
        }

        getUserData().then((res) =>
            dispatch(userActions.setUserInfo(res.data)),
        );

        if (userInfo?.avatar === null) {
            setIcon(defaultIcon);
        } else {
            setIcon(`${baseUrl}/resources${userInfo?.avatar}`);
        }
    }, [userInfo, icon]);

    return (
        <div className={cls.profile}>
            <header className={cls.profile_header}>
                <AppLink
                    text="На главную"
                    to={RoutePath.main}
                    className={cls.profile_header_homeBtn}
                />
                <Button
                    onClick={onLogout}
                    className={cls.profile_header_logout}
                >
                    Выход
                </Button>
            </header>
            <div className={cls.profile_container}>
                <h3>Профиль</h3>
                <img
                    onClick={() => updateIconProfile(setIcon, handleUpload)}
                    className={cls.profile_container_icon}
                    src={icon}
                    alt="icon"
                />
                <Form
                    onSubmit={handleSubmit(updateProfile)}
                    className={cls.profile_container_form}
                    method="submit"
                >
                    <div className={cls.profile_container_form_fields}>
                        {dictonariesFields.map((field) => (
                            <Field
                                fieldName={field.fieldName}
                                fieldType={field.fieldType}
                                key={field.key}
                                disabled={disabled}
                                {...register(field.key, {
                                    pattern: {
                                        value: field.regExp,
                                        message: field.message,
                                    },
                                })}
                                errorMessage={
                                    (errors[field.key] as any)?.message
                                }
                            />
                        ))}
                    </div>
                    <Button onClick={updateFunc} type="submit">
                        {textBtn}
                    </Button>
                </Form>
            </div>
        </div>
    );
});

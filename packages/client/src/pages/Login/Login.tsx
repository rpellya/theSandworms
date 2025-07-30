import { TextLabel } from 'components/TextLabel';
import cls from './Login.module.scss';
import React, { memo, useEffect } from 'react';
import { Button } from 'components/Button';
import { AppLink } from 'components/Link/AppLink';
import { Input } from 'components/Input';
import { useLazyGetAuthUserQuery, useLoginApiMutation } from 'api/auth/authApi';
import { Form } from 'components/Form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store/hooksStore';
import { useForm } from 'react-hook-form';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import {
    useLazyGetYandexServiceIdQuery,
    useLazySetUserQuery,
} from 'api/auth/oAuthApi';
import { userActions } from 'store/userInfoSlice';
import { USER_LOCALSTORAGE_KEY } from 'app/providers/const/localStorage';

interface LoginProps {
    regPath: string;
}
interface LoginData {
    login: string;
    password: string;
}

export const Login: React.FC<LoginProps> = memo(({ regPath }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginData>({
        mode: 'onSubmit',
    });
    const { isAuthenticated } = useAppSelector((state) => state.userReducer);
    const [loginFunc] = useLoginApiMutation();
    const [getUserInfo] = useLazyGetAuthUserQuery();
    const [setUser] = useLazySetUserQuery();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const getUser = () => {
        getUserInfo().then((res) => {
            if (res.data) {
                setUser(JSON.stringify(res.data));
                dispatch(userActions.setUserInfo(res.data));
                localStorage.setItem(
                    USER_LOCALSTORAGE_KEY,
                    JSON.stringify(res.data),
                );
            }
        });
    };

    const onSubmit = async (values: LoginData) => {
        if (isAuthenticated) {
            navigate(RoutePath.main);
        }

        try {
            const response = await loginFunc(values);
            if (
                response.data === 'OK' ||
                JSON.parse((response as any).error.data).reason ===
                    'User already in system'
            ) {
                setTimeout(getUser, 500);
                navigate(RoutePath.main);
            }
        } catch (err) {
            console.error('error:', err);
        }
    };

    const [getServiceId] = useLazyGetYandexServiceIdQuery();

    const authorizationUsingYandex = async () => {
        try {
            const { data } = await getServiceId({
                redirectUri: `${window.location.origin}/oauth`,
            });
            if (data?.clientId) {
                // eslint-disable-next-line max-len
                const URL = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${data.clientId}&redirect_uri=${window.location.origin}/oauth`;
                window.location.href = URL;
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated]);
    return (
        <div className={cls.loginPage}>
            <Form onSubmit={handleSubmit(onSubmit)} method="submit">
                <TextLabel
                    className={cls.loginPage__title}
                    text="Вход в систему"
                    key="title"
                />
                <Input
                    inputLabel="Логин"
                    placeholder="Введите логин"
                    type="text"
                    inputId="login"
                    key="login"
                    {...register('login', {
                        required: 'Логин обязателен',
                        pattern: {
                            value: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
                            message: `От 3 до 20 символов Латиница, 
                                      цифры Без пробелов и спецсимволов, кроме - и _ 
                                      Не должен состоять только из цифр`,
                        },
                    })}
                />
                {errors.login && (
                    <TextLabel
                        className={cls.loginPage__errorLabel}
                        text={errors.login.message || ''}
                        key="loginError"
                    />
                )}
                <Input
                    inputLabel="Пароль"
                    type="password"
                    placeholder="Введите пароль"
                    inputId="password"
                    key="password"
                    {...register('password', {
                        required: 'Пароль обязателен',
                        pattern: {
                            // eslint-disable-next-line no-useless-escape
                            value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,40}$/,
                            message: `Пароль должен содержать от 8 до 40 
                                      символов, хотя бы одну заглавную букву 
                                      и цифру`,
                        },
                    })}
                />
                {errors.password && (
                    <TextLabel
                        className={cls.loginPage__errorLabel}
                        text={errors.password.message || ''}
                        key="passwordError"
                    />
                )}
                <Button className={cls.loginPage__button} type="submit">
                    Войти
                </Button>
                <Button
                    className={cls.loginPage__button}
                    onClick={authorizationUsingYandex}
                >
                    Войти через Яндекс
                </Button>
                <AppLink
                    to={regPath}
                    text="Зарегистрироваться"
                    key="registration"
                />
            </Form>
        </div>
    );
});

import { TextLabel } from 'components/TextLabel';
import cls from './Login.module.scss';
import React, { memo } from 'react';
import { Button } from 'components/Button';
import { AppLink } from 'components/Link/AppLink';
import { Input } from 'components/Input';
import { useLazyGetAuthUserQuery, useLoginApiMutation } from 'api/auth/authApi';
import { Form } from 'components/Form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { setUserInfo } from 'store/userInfoSlice';
import { useForm } from 'react-hook-form';

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
    const [loginFunc] = useLoginApiMutation();
    const [getAuthUser] = useLazyGetAuthUserQuery();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const onSubmit = async (values: LoginData) => {
        try {
            const response = await loginFunc(values);

            if (response.data === 'OK') {
                const result = await getAuthUser();

                if (result.status === 'fulfilled') {
                    navigate('/');
                    dispatch(setUserInfo(result.data));
                }
            }
        } catch (err) {
            console.error('error:', err);
        }
    };
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
                <AppLink
                    to={regPath}
                    text="Зарегистрироваться"
                    key="registration"
                />
            </Form>
        </div>
    );
});

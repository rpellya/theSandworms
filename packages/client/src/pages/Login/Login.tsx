import { TextLabel } from 'components/TextLabel';
import cls from './Login.module.scss';
import React, { memo, useState } from 'react';
import { Button } from 'components/Button';
import { AppLink } from 'components/Link/AppLink';
import { Input } from 'components/Input';
import { useLazyGetAuthUserQuery, useLoginApiMutation } from 'api/auth/authApi';
import { Form } from 'components/Form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store/hooks';
import { setUserInfo } from 'store/userInfoSlice';

interface LoginProps {
    regPath: string;
}
const initialBodyAuth = {
    login: '',
    password: '',
};
export const Login: React.FC<LoginProps> = memo(({ regPath }) => {
    const [loginFunc] = useLoginApiMutation();
    const [getAuthUser] = useLazyGetAuthUserQuery();
    const navigate = useNavigate();
    const [bodyAuth, setBodyAuth] = useState(initialBodyAuth);
    const dispatch = useAppDispatch();
    const onChange = (
        key: string,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setBodyAuth((prevState) => ({
            ...prevState,
            [key]: event.target.value,
        }));
    };
    const onSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        try {
            const response = await loginFunc(bodyAuth);

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
            <Form method="submit">
                <TextLabel
                    className={cls.loginPage__title}
                    text="Вход в систему"
                    key="title"
                />
                <Input
                    inputLabel="Логин"
                    placeholder="Введите логин"
                    type="text"
                    name='login'
                    inputId="login"
                    key="login"
                    value={bodyAuth.login}
                    onChange={(event) => onChange('login', event)}
                />
                <TextLabel
                    className={cls.loginPage__errorLabel}
                    text="Ошибка"
                    key="loginError"
                />
                <Input
                    inputLabel="Пароль"
                    type="password"
                    placeholder="Введите пароль"
                    name="password"
                    inputId="password"
                    key="password"
                    value={bodyAuth.password}
                    onChange={(event) => onChange('password', event)}
                />
                <TextLabel
                    className={cls.loginPage__errorLabel}
                    text=""
                    key="passwordError"
                />
                <Button
                    className={cls.loginPage__button}
                    key="submit"
                    onClick={(e) => onSubmit(e)}
                >
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

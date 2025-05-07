import { TextLabel } from 'components/TextLabel';
import cls from './Login.module.scss';
import { FormEventHandler, memo } from 'react';
import { AppForm } from 'components/Form';
import { Button } from 'components/Button';
import { AppLink } from 'components/Link/AppLink';
import { Input } from 'components/Input';

interface LoginProps {
    regPath: string;
    onSubmit: FormEventHandler;
}

export const Login: React.FC<LoginProps> = memo(({ regPath, onSubmit }) => {
    return (
        <div className={cls.loginPage}>
            <AppForm
                onSubmit={onSubmit}
                children={[
                    <TextLabel
                        className={cls.loginPage__title}
                        text="Вход в систему"
                        key="title"
                    />,
                    <Input
                        inputLabel="Логин"
                        placeholder="Введите логин"
                        type="text"
                        key="login"
                    />,
                    <TextLabel
                        className={cls.loginPage__errorLabel}
                        text="Ошибка"
                        key="loginError"
                    />,
                    <Input
                        inputLabel="Пароль"
                        type="password"
                        placeholder="Введите пароль"
                        key="password"
                    />,
                    <TextLabel
                        className={cls.loginPage__errorLabel}
                        text=""
                        key="passwordError"
                    />,
                    <Button
                        className={cls.loginPage__button}
                        key="submit"
                        onClick={onSubmit}
                    >
                        Войти
                    </Button>,
                    <AppLink
                        to={regPath}
                        text="Зарегистрироваться"
                        key="registration"
                    />,
                ]}
                method="submit"
            />
        </div>
    );
});

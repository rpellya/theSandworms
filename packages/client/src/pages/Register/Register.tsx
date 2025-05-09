import { memo } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { Button } from 'components/Button';

import './Register.scss';

interface IUserData {
    login: string;
    password: string;
    password2?: string;
    email: string;
}

const Register = memo(() => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const onSubmit = (values: IUserData | FieldValues) => {
        console.log('Form values');
        console.log(values);
        console.log('TODO: call to API');
    };

    const doEnter = () => {
        console.log('TODO: make router to return to enter page');
    };

    return (
        <div className="register">
            <div className="register_content">
                <div className="register_content_title">Регистрация</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="register_content_fields">
                        <label htmlFor="login" className="label">
                            Логин
                            <input
                                {...register('login', { required: true })}
                                name="login"
                                type="text"
                                className="input"
                                placeholder="Логин"
                            ></input>
                            {errors.login?.type === 'required' && (
                                <div className="error">Логин обязателен</div>
                            )}
                        </label>

                        <label htmlFor="password" className="label">
                            Пароль
                            <input
                                {...register('password', { required: true })}
                                name="password"
                                type="password"
                                className="input"
                                placeholder="Пароль"
                            ></input>
                            {errors.password?.type === 'required' && (
                                <div className="error">Без пароля никуда</div>
                            )}
                        </label>

                        <label htmlFor="password2" className="label">
                            Пароль ещё раз
                            <input
                                {...register('password2', {
                                    required: true,
                                    validate: (val: string) => {
                                        if (watch('password') !== val) {
                                            return 'Пароли не совпадают';
                                        }
                                    },
                                })}
                                name="password2"
                                type="password"
                                className="input"
                                placeholder="Пароль ещё раз"
                            ></input>
                            {errors.password2?.type === 'required' && (
                                <div className="error">
                                    Пароль надо повторить
                                </div>
                            )}
                            {errors.password2?.message && (
                                <div className="error">
                                    {errors.password2.message}
                                </div>
                            )}
                        </label>

                        <label htmlFor="email" className="label">
                            Email
                            <input
                                {...register('email', { required: true })}
                                name="email"
                                type="email"
                                className="input"
                                placeholder="Почта"
                            ></input>
                            {errors.email?.type === 'required' && (
                                <div className="error">
                                    Электропочта нужна как воздух
                                </div>
                            )}
                        </label>
                    </div>
                    <div className="register_content_buttons">
                        <Button type="submit">Регистрация</Button>
                        <Button onClick={doEnter}>Вход</Button>
                    </div>
                </form>
            </div>
        </div>
    );
});

export default Register;

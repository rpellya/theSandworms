import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button';

import './Register.module.scss';

interface IUserData {
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    password: string;
    password2: string;
}

export const Register = memo(() => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IUserData>();

    const onSubmit = (values: IUserData) => {
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
                <h2 className="register_content_title">Регистрация</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="register_content_fields">
                        <label htmlFor="first_name" className="label">
                            Имя
                            <input
                                {...register('first_name', { required: true })}
                                name="first_name"
                                type="text"
                                className="input"
                                placeholder="Имя"
                            />
                            {errors.first_name?.type === 'required' && (
                                <div className="error">Имя обязательно</div>
                            )}
                        </label>

                        <label htmlFor="second_name" className="label">
                            Имя
                            <input
                                {...register('second_name', { required: true })}
                                name="second_name"
                                type="text"
                                className="input"
                                placeholder="Фамилия"
                            />
                            {errors.second_name?.type === 'required' && (
                                <div className="error">Фамилия обязательна</div>
                            )}
                        </label>

                        <label htmlFor="login" className="label">
                            Логин
                            <input
                                {...register('login', { required: true })}
                                name="login"
                                type="text"
                                className="input"
                                placeholder="Логин"
                            />
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
                            />
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
                            />
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

                        <label htmlFor="phone" className="label">
                            Email
                            <input
                                {...register('phone', { required: true })}
                                name="phone"
                                type="text"
                                className="input"
                                placeholder="Телефон"
                            />
                            {errors.phone?.type === 'required' && (
                                <div className="error">
                                    Без телефона как без рук
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
                            />
                            {errors.email?.type === 'required' && (
                                <div className="error">
                                    Электропочта нужна как воздух
                                </div>
                            )}
                        </label>
                    </div>
                    <div className="register_content_buttons">
                        <Button className="content_button" type="submit">
                            Регистрация
                        </Button>
                        <Button className="content_button" onClick={doEnter}>
                            Вход
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
});

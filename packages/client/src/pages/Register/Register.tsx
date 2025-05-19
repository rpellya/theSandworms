import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button';

import cls from './Register.module.scss';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useRegisterApiMutation } from 'api/services/auth/authApi';
import { AppLink } from 'components/Link/AppLink';

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
    const navigate = useNavigate();
    const [funcRegisterApi] = useRegisterApiMutation();
    console.log('errors', errors);
    const onSubmit = async (values: IUserData) => {
        try {
            const response = await funcRegisterApi(values);
            if (response?.data?.id) {
                navigate(RoutePath.login);
            } else {
                alert((response?.error as any)?.data?.reason);
            }
        } catch (error) {
            console.error('error', error);
        }
    };

    return (
        <div className={cls.register}>
            <div className={cls.register_content}>
                <h2 className={cls.register_content_title}>Регистрация</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={cls.register_content_fields}>
                        <label htmlFor="first_name" className={cls.label}>
                            Имя
                            <input
                                {...register('first_name', { required: true })}
                                name="first_name"
                                type="text"
                                className={cls.input}
                                placeholder="Имя"
                            />
                            {errors.first_name?.type === 'required' && (
                                <div className={cls.error}>Имя обязательно</div>
                            )}
                        </label>

                        <label htmlFor="second_name" className={cls.label}>
                            Фамилия
                            <input
                                {...register('second_name', { required: true })}
                                name="second_name"
                                type="text"
                                className={cls.input}
                                placeholder="Фамилия"
                            />
                            {errors.second_name?.type === 'required' && (
                                <div className={cls.error}>
                                    Фамилия обязательна
                                </div>
                            )}
                        </label>

                        <label htmlFor="login" className={cls.label}>
                            Логин
                            <input
                                {...register('login', { required: true })}
                                name="login"
                                type="text"
                                className={cls.input}
                                placeholder="Логин"
                            />
                            {errors.login?.type === 'required' && (
                                <div className={cls.error}>
                                    Логин обязателен
                                </div>
                            )}
                        </label>

                        <label htmlFor="password" className={cls.label}>
                            Пароль
                            <input
                                {...register('password', { required: true })}
                                name="password"
                                type="password"
                                className={cls.input}
                                placeholder="Пароль"
                            />
                            {errors.password?.type === 'required' && (
                                <div className="error">Без пароля никуда</div>
                            )}
                        </label>

                        <label htmlFor="password2" className={cls.label}>
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
                                className={cls.input}
                                placeholder="Пароль ещё раз"
                            />
                            {errors.password2?.type === 'required' && (
                                <div className={cls.error}>
                                    Пароль надо повторить
                                </div>
                            )}
                            {errors.password2?.message && (
                                <div className={cls.error}>
                                    {errors.password2.message}
                                </div>
                            )}
                        </label>

                        <label htmlFor="phone" className={cls.label}>
                            Телефон
                            <input
                                {...register('phone', { required: true })}
                                name="phone"
                                type="text"
                                className={cls.input}
                                placeholder="Телефон"
                            />
                            {errors.phone?.type === 'required' && (
                                <div className={cls.error}>
                                    Без телефона как без рук
                                </div>
                            )}
                        </label>

                        <label htmlFor="email" className={cls.label}>
                            Email
                            <input
                                {...register('email', { required: true })}
                                name="email"
                                type="email"
                                className={cls.input}
                                placeholder="Почта"
                            />
                            {errors.email?.type === 'required' && (
                                <div className={cls.error}>
                                    Электропочта нужна как воздух
                                </div>
                            )}
                        </label>
                    </div>
                    <div className={cls.register_content_buttons}>
                        <Button
                            className={cls.register_content_buttons_btn}
                            type="submit"
                        >
                            Регистрация
                        </Button>
                        <AppLink
                            className={cls.register_content_buttons_btn}
                            to={RoutePath.login}
                        >
                            Вход
                        </AppLink>
                    </div>
                </form>
            </div>
        </div>
    );
});

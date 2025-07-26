import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'components/Button';

import cls from './Register.module.scss';
import { RoutePath } from 'app/providers/router/config/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useRegisterApiMutation } from 'api/auth/authApi';
import { AppLink } from 'components/Link/AppLink';
import { Input } from 'components/Input';
import { TextLabel } from 'components/TextLabel';
import { Form } from 'components/Form';

interface UserData {
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
    } = useForm<UserData>({
        mode: 'onSubmit',
    });
    const navigate = useNavigate();
    const [funcRegisterApi] = useRegisterApiMutation();
    const onSubmit = async (values: UserData) => {
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
                <Form
                    className={cls.register_content_fields}
                    onSubmit={handleSubmit(onSubmit)}
                    method="submit"
                >
                    <label htmlFor="first_name" className={cls.label}>
                        <Input
                            inputLabel="Имя"
                            inputClassName={cls.input}
                            {...register('first_name', {
                                required: 'Имя обязательно',
                                pattern: {
                                    value: /^[А-ЯЁA-Z][а-яёa-z-]*$/,
                                    message: `Имя должно начинаться с заглавной буквы и 
                                                  содержать только буквы или дефис`,
                                },
                            })}
                            type="text"
                            placeholder="Введите имя"
                        />
                        {errors.first_name && (
                            <TextLabel
                                className={cls.error}
                                text={errors.first_name.message || ''}
                                key="first_name"
                            />
                        )}
                    </label>
                    <label htmlFor="second_name" className={cls.label}>
                        <Input
                            inputLabel="Фамилия"
                            inputClassName={cls.input}
                            {...register('second_name', {
                                required: 'Фамилия обязательна',
                                pattern: {
                                    value: /^[А-ЯЁA-Z][а-яёa-z-]*$/,
                                    message: `Фамилия должна начинаться с заглавной буквы и 
                                                  содержать только буквы или дефис`,
                                },
                            })}
                            type="text"
                            placeholder="Введите фамилию"
                        />
                        {errors.second_name && (
                            <TextLabel
                                className={cls.error}
                                text={errors.second_name.message || ''}
                            />
                        )}
                    </label>
                    <label htmlFor="login" className={cls.label}>
                        <Input
                            {...register('login', {
                                required: 'Логин обязателен',
                                pattern: {
                                    value: /^(?!\d+$)[a-zA-Z0-9_-]{3,20}$/,
                                    message: `От 3 до 20 символов Латиница, 
                                                  цифры Без пробелов и спецсимволов, кроме - и _ 
                                                  Не должен состоять только из цифр`,
                                },
                            })}
                            type="text"
                            inputLabel="Логин"
                            inputClassName={cls.input}
                            placeholder="Введите логин"
                        />
                        {errors.login && (
                            <TextLabel
                                className={cls.error}
                                text={errors.login.message || ''}
                            />
                        )}
                    </label>
                    <label htmlFor="password" className={cls.label}>
                        <Input
                            inputLabel="Пароль"
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
                            type="password"
                            inputClassName={cls.input}
                            placeholder="Введите пароль"
                        />
                        {errors.password && (
                            <TextLabel
                                className={cls.error}
                                text={errors.password.message || ''}
                            />
                        )}
                    </label>
                    <label htmlFor="password2" className={cls.label}>
                        <Input
                            {...register('password2', {
                                required: 'Пароль надо повторить',
                                pattern: {
                                    // eslint-disable-next-line no-useless-escape
                                    value: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,40}$/,
                                    message: `Пароль должен содержать от 8 до 40 
                                                  символов, хотя бы одну заглавную букву 
                                                  и цифру`,
                                },
                                validate: (val: string) =>
                                    watch('password') !== val
                                        ? 'Пароли не совпадают'
                                        : true,
                            })}
                            name="password2"
                            type="password"
                            inputLabel="Повтор пароля"
                            inputClassName={cls.input}
                            placeholder="Введите пароль ещё раз"
                        />
                        {errors.password2 && (
                            <TextLabel
                                className={cls.error}
                                text={errors.password2.message || ''}
                            />
                        )}
                    </label>

                    <label htmlFor="phone" className={cls.label}>
                        <Input
                            {...register('phone', {
                                required: 'Телефон обязателен',
                                pattern: {
                                    value: /^\+?\d{10,15}$/,
                                    message:
                                        'Телефон может содержать только цифры и должен быть от 10 до 15 символов',
                                },
                            })}
                            type="text"
                            inputLabel="Телефон"
                            inputClassName={cls.input}
                            placeholder="Введите номер телефона"
                        />
                        {errors.phone && (
                            <TextLabel
                                className={cls.error}
                                text={errors.phone.message || ''}
                            />
                        )}
                    </label>

                    <label htmlFor="email" className={cls.label}>
                        <Input
                            {...register('email', {
                                required: 'Email обязателен',
                                pattern: {
                                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z]+\.[a-zA-Z]{2,}$/,
                                    message: `Латиница 
                                                  Может включать цифры, -, _ 
                                                  Обязательно: @, далее буквы, точка, затем домен`,
                                },
                            })}
                            type="email"
                            inputLabel="Почта"
                            inputClassName={cls.input}
                            placeholder="Введите адрес электронной почты"
                        />
                        {errors.email && (
                            <div className={cls.error}>
                                {errors.email.message}
                            </div>
                        )}
                    </label>
                    <div className={cls.register_content_buttons}>
                        <Button
                            className={cls.register_content_buttons_btn}
                            type="submit"
                        >
                            Регистрация
                        </Button>
                        <AppLink
                            className={cls.register_content_buttons_link}
                            to={RoutePath.login}
                        >
                            Вход
                        </AppLink>
                    </div>
                </Form>
            </div>
        </div>
    );
});

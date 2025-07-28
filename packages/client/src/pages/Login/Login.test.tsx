import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Login } from 'pages/Login';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

describe('Login page UI test', () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login regPath="" />
                </Provider>
            </BrowserRouter>,
        );
    });

    afterEach(cleanup);

    test('Should render the form header', () => {
        expect(screen.getByText('Вход в систему')).toBeInTheDocument();
    });

    test('Should render login input field', () => {
        expect(screen.getByLabelText('Логин')).toBeInTheDocument();
    });

    test('Should render password input field', () => {
        expect(screen.getByLabelText('Пароль')).toBeInTheDocument();
    });

    test('Should render both buttons', () => {
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(2);
    });

    test('Should render login button with correct text', () => {
        const loginButton = screen.getByRole('button', { name: /^войти$/i });
        expect(loginButton).toBeInTheDocument();
    });

    test('Should render Yandex login button with correct text', () => {
        const yandexButton = screen.getByRole('button', {
            name: /войти через яндекс/i,
        });
        expect(yandexButton).toBeInTheDocument();
    });

    test('Should render registration link', () => {
        const link = screen.getByRole('link', { name: /зарегистрироваться/i });
        expect(link).toBeInTheDocument();
    });
});

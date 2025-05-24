import '@testing-library/jest-dom';
import {cleanup, render, screen} from '@testing-library/react';
import { Login } from './Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login page UI test', () => {

    beforeEach(() => {
        render(
            <BrowserRouter>
                <Login
                    regPath=''
                    onSubmit={() => {return true}}
                />
            </BrowserRouter>
        );
    })

    test('Should header of form is defined', () => {
        expect(screen.getByText('Вход в систему')).toBeDefined();
    });

    test('Should input for name is defined', () => {
        expect(screen.getByLabelText('Логин')).toBeDefined();
    });

    test('Should input for password is defined', () => {
        expect(screen.getByLabelText('Пароль')).toBeDefined();
    });

    test('Should button login is defined', () => {
        expect(screen.getByRole('button')).toBeDefined();
    });

    test('Should button-s caption is correct', () => {
        expect(screen.getByRole('button')).toHaveTextContent('Войти');
    });

    test('Should registration link is defined', () => {
        expect(screen.getByRole('link')).toBeDefined();
    });

    test('Should registration-s link caption is correct', () => {
        expect(screen.getByRole('link')).toHaveTextContent('Зарегистрироваться');
    });

    afterEach(cleanup);
});

import '@testing-library/jest-dom';
import {cleanup, render, screen} from '@testing-library/react';
import { Login } from './Login';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

describe('Login page UI test', () => {

    interface UserState {
        name: string
        password: string
    };

    const initialState: UserState = {
        name: '',
        password: ''
    };

    const userSlice = createSlice({
        name: 'user',
        initialState,
        reducers: {},
    })

    type RootState = ReturnType<typeof rootReducer>;

    const rootReducer = combineReducers({
        user: userSlice.reducer
    });

    function setupStore(preloadedState?: Partial<RootState>) {
        return configureStore({
            reducer: rootReducer,
            preloadedState
        })
    }

    beforeEach(() => {
        const store = setupStore();

        render(
            <BrowserRouter>
                <Provider store={store}>
                    <Login
                        regPath=''
                    />
                </Provider>
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

import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'store';

test('Profile renders correctly', () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <Profile />
            </BrowserRouter>
        </Provider>,
    );
    expect(screen.getByText('Профиль')).toBeDefined();
});

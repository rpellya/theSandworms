import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';
import { Provider } from 'react-redux';
import { store } from '../../api/store/index';
import { BrowserRouter } from 'react-router-dom';

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

import { render, screen } from '@testing-library/react';
import { LeaderBoard } from './LeaderBoard';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from 'store';

const appContent = 'Лидеры';

test('LeaderBoard', async () => {
    render(
        <Provider store={store}>
            <BrowserRouter>
                <LeaderBoard />
            </BrowserRouter>
            ,
        </Provider>,
    );
    expect(screen.getByText(appContent)).toBeDefined();
});

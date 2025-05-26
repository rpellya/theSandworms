import { render, screen } from '@testing-library/react';
import { LeaderBoard } from './LeaderBoard';
import { BrowserRouter } from 'react-router-dom';

const appContent = 'Лидеры';

test('LeaderBoard', async () => {
    render(
        <BrowserRouter>
            <LeaderBoard />
        </BrowserRouter>,
    );
    expect(screen.getByText(appContent)).toBeDefined();
});

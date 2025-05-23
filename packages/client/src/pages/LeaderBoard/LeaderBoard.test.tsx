import { render, screen } from '@testing-library/react';
import { LeaderBoard } from './LeaderBoard';

const appContent = 'Лидеры';

test('LeaderBoard', async () => {
    render(<LeaderBoard />);
    expect(screen.getByText(appContent)).toBeDefined();
});

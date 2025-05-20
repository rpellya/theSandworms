import { render, screen } from '@testing-library/react';
import { LeaderBoard } from './LeaderBoard';

const appContent = 'Leader Board';

test('LeaderBoard', async () => {
    render(<LeaderBoard />);
    expect(screen.getByText(appContent)).toBeDefined();
});

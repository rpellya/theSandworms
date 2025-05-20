import { render, screen } from '@testing-library/react';
import { LeaderBoardContent } from './LeaderBoardContent';
import { ILeaders } from './LeaderBoardContent';

const appContent = 'user A';

const mockLeaders: ILeaders = {
    list: [
        { login: 'user A', highScore: 100500900 },
        { login: 'user B', highScore: 100508 },
    ],
};

test('LeaderBoardContent', async () => {
    render(<LeaderBoardContent {...mockLeaders} />);
    expect(screen.getByText(appContent)).toBeDefined();
});

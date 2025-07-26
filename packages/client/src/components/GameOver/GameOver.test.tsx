import { render, screen } from '@testing-library/react';
import { GameOver } from './GameOver';

const appContent = 'Игра окончена';

test('GameOver', async () => {
    render(<GameOver score={10} />);
    expect(screen.getByText(appContent)).toBeDefined();
});

import { render, screen } from '@testing-library/react';
import { Profile } from './Profile';

const appContent = 'Profile';

test('Example test', async () => {
    render(<Profile />);
    expect(screen.getByText(appContent)).toBeDefined();
});

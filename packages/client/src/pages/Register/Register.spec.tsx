import { render, screen } from '@testing-library/react';
import { Register } from './Register';

const appContent = 'Регистрация';

test('Register', async () => {
    render(<Register />);
    expect(screen.getByText(appContent)).toBeDefined();
});

import { expect, test } from 'vitest';
import { screen, render } from '@testing-library/react';

import App from './App';

test('renders', () => {
    render(<App />);
    const logo = screen.getByTestId("vite-logo");
    expect(logo).toBeDefined();
})

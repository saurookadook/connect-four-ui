import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Login } from './index';

describe('Login Page', () => {
  it('render the Login page', () => {
    render(<Login />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Connect Four: Player Login' }),
    ).toBeVisible();
  });
});

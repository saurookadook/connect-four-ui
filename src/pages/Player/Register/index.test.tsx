import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Register } from './index';

describe('Register Page', () => {
  it('render the Register page', () => {
    render(<Register />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Connect Four: New Player Registration' }),
    ).toBeVisible();
  });
});

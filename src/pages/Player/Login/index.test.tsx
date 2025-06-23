import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { WithMemoryRouter } from '@/utils/testing';
import { expectLoginFormToBeCorrectAndVisible } from '../testUtils';
import { Login } from './index';

describe('Login Page', () => {
  it('render the Login page', async () => {
    render(<WithMemoryRouter initialEntries={['/login']} />);

    expect(
      await screen.findByRole('heading', { level: 2, name: 'Connect Four: Player Login' }),
    ).toBeVisible();

    const formEl = await screen.findByRole('form');
    expectLoginFormToBeCorrectAndVisible(formEl);
  });
});

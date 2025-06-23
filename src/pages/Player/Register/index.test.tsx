import { beforeAll, describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

import { WithMemoryRouter } from '@/utils/testing';
import { expectRegisterFormToBeCorrectAndVisible } from '../testUtils';
import { Register } from './index';

describe('Register Page', () => {
  it('render the Register page', async () => {
    render(<WithMemoryRouter initialEntries={['/register']} />);

    expect(
      await screen.findByRole('heading', {
        level: 2,
        name: 'Connect Four: New Player Registration',
      }),
    ).toBeVisible();

    const formEl = await screen.findByRole('form');
    expectRegisterFormToBeCorrectAndVisible(formEl);
  });
});

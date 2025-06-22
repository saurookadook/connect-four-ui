import { within } from '@testing-library/react';
import { expect } from 'vitest';

function expectUsernameInputToBeCorrectAndVisible(formEl: HTMLElement) {
  const usernameInput = within(formEl).getByLabelText('Username');
  expect(usernameInput).toBeVisible();
  expect(usernameInput).toHaveAttribute('type', 'text');
  // TODO: maybe more details?
}

function expectPasswordInputToBeCorrectAndVisible(
  formEl: HTMLElement,
  labelText: string = 'Password',
) {
  const passwordInput = within(formEl).getByLabelText(labelText);
  expect(passwordInput).toBeVisible();
  expect(passwordInput).toHaveAttribute('type', 'password');
  // TODO: maybe more assertions?
}

function expectSubmitButtonToBeCorrectAndVisible(
  formEl: HTMLElement,
  labelText: string = 'Submit',
) {
  const submitButton = within(formEl).getByRole('button', { name: labelText });
  expect(submitButton).toBeVisible();
  expect(submitButton).toHaveAttribute('type', 'submit');
}

export function expectLoginFormToBeCorrectAndVisible(formEl: HTMLElement) {
  expect(formEl).toBeVisible();

  expectUsernameInputToBeCorrectAndVisible(formEl);
  expectPasswordInputToBeCorrectAndVisible(formEl);
  expectSubmitButtonToBeCorrectAndVisible(formEl, 'Log In');
}

export function expectRegisterFormToBeCorrectAndVisible(formEl: HTMLElement) {
  expect(formEl).toBeVisible();

  expectUsernameInputToBeCorrectAndVisible(formEl);
  expectPasswordInputToBeCorrectAndVisible(formEl);
  expectPasswordInputToBeCorrectAndVisible(formEl, 'Confirm Password');
  expectSubmitButtonToBeCorrectAndVisible(formEl, 'Register');
}

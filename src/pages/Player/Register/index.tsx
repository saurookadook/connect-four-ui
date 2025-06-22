import { useRef } from 'react';

import { FlexColumn } from '@/layouts';
import { BaseInput } from '../components';
import { getFormData } from '../utils';

// 🔒 🔓
export function Register() {
  const formRef = useRef<HTMLFormElement>(null);

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log('    Register.handleOnSubmit    '.padStart(100, '=').padEnd(180, '='));
    // console.log('    event:');
    // console.dir(event);
    // console.log('    target:');
    // console.dir(event.target);
    // console.log('='.repeat(180));
    const formData = getFormData(event.target as HTMLFormElement);
    // TODO: add further error/invalid handling
    if (formData.password !== formData.confirmPassword) {
      // @ts-expect-error: TypeScript doesn't like this :]
      formRef.current.elements['confirm-password'].setCustomValidity(
        'Password fields must be identical.',
      );
      return;
    }

    // TODO: dispatch action :]
  }

  return (
    <div id="register">
      <h2>{`Connect Four: New Player Registration`}</h2>

      <form onSubmit={handleOnSubmit} ref={formRef}>
        <FlexColumn>
          <label htmlFor="username">Username</label>
          <BaseInput
            type="text" // force formatting
            id="username"
            name="username"
            maxLength={24}
          />

          <label htmlFor="password">Password</label>
          <BaseInput
            type="password" // force formatting
            id="password"
            name="password"
            minLength={8}
            maxLength={30}
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <BaseInput
            type="password" // force formatting
            id="confirm-password"
            name="confirm-password"
            minLength={8}
            maxLength={30}
          />

          <button type="submit">Register</button>
        </FlexColumn>
      </form>
    </div>
  );
}

import { useRef } from 'react';

import { FlexColumn } from '@/layouts';
import { useAppStore } from '@/store';
import { logInPlayer } from '@/store/actions';
import { BaseInput } from '../components';
import { getFormData } from '../utils';

// 🔒 🔓
export function Login() {
  const { appDispatch } = useAppStore();
  const formRef = useRef<HTMLFormElement>(null);

  function handleOnSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // console.log('    Login.handleOnSubmit    '.padStart(100, '=').padEnd(180, '='));
    // console.log('    event:');
    // console.dir(event);
    // console.log('    target:');
    // console.dir(event.target);
    // console.log('='.repeat(180));
    const formData = getFormData(event.target as HTMLFormElement);
    // TODO: add further error/invalid handling

    // TODO: dispatch action :]
    logInPlayer({
      dispatch: appDispatch,
      username: formData.username.value,
      password: formData.password.value,
    });
  }

  return (
    <div id="login">
      <h2>{`Connect Four: Player Login`}</h2>

      <form
        onSubmit={handleOnSubmit}
        ref={formRef}
        // NOTE: `role` is only needed until a bug in testing-library is fixed
        // - https://github.com/testing-library/dom-testing-library/issues/1293
        role="form"
      >
        <FlexColumn>
          <label htmlFor="username">Username</label>
          <BaseInput
            type="text" // force formatting
            id="username"
            name="username"
            maxLength={8}
          />

          <label htmlFor="password">Password</label>
          <BaseInput
            type="password" // force formatting
            id="password"
            name="password"
            minLength={8}
            maxLength={30}
          />

          <button type="submit">Log In</button>
        </FlexColumn>
      </form>
    </div>
  );
}

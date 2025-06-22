import { FlexColumn } from '@/layouts';
import { BaseInput } from '../components';
import { getFormData } from '../utils';

// 🔒 🔓
export function Login() {
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
  }

  return (
    <div id="login">
      <h2>{`Connect Four: Player Login`}</h2>

      <form onSubmit={handleOnSubmit}>
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

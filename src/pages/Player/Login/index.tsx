import { FlexColumn } from '@/layouts';

const inputSize = 40;

// 🔒 🔓
export function Login() {
  return (
    <div id="login">
      <h2>{`Connect Four: Player Login`}</h2>

      <form>
        <FlexColumn>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            minLength={4}
            maxLength={8}
            size={inputSize}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={4}
            maxLength={30}
            size={inputSize}
          />

          <button type="submit">Log In</button>
        </FlexColumn>
      </form>
    </div>
  );
}

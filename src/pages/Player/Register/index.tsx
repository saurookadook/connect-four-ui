import { FlexColumn } from '@/layouts';

const inputSize = 40;

// 🔒 🔓
export function Register() {
  return (
    <div id="register">
      <h2>{`Connect Four: New Player Registration`}</h2>

      <form>
        <FlexColumn>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            minLength={5}
            maxLength={24}
            size={inputSize}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            minLength={8}
            maxLength={30}
            size={inputSize}
          />

          <label htmlFor="confirm-password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            required
            minLength={8}
            maxLength={30}
            size={inputSize}
          />

          <button type="submit">Register</button>
        </FlexColumn>
      </form>
    </div>
  );
}

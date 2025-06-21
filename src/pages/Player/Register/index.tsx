// 🔒 🔓
export function Register() {
  return (
    <div id="register">
      <h2>{`Connect Four: New Player Registration`}</h2>

      <form>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          required
          minLength={5}
          maxLength={24}
          size={10}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength={8}
          maxLength={30}
          size={10}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

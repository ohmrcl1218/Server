import { useState } from "react";
import "../styles/Login.css";
import SuccessPopUp from "../modal/SuccessPopup"
import FailedPopUp from "../modal/FailedPopUp";

const MOCK_USERS = [
  { name: "Mercel Macasinag", email: "mercel@example.com", password: "password123" },
];

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailed, setShowFailed] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const matchedUser = MOCK_USERS.find(
      (user) => user.email === email && user.password === password
    );

    if (matchedUser) {
      setLoggedInUser(matchedUser);
      setShowSuccess(true);
    } else {
      setShowFailed(true);
    }
  }

  function handleSuccessClose() {
    setShowSuccess(false);
    onLoginSuccess(loggedInUser);
  }

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <p className="login-kicker">Admin access</p>
        <h1>Sign in</h1>

        <label htmlFor="l-email">Email</label>
        <input
          id="l-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="mercel@example.com"
          required
        />

        <label htmlFor="l-password">Password</label>
        <input
          id="l-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        <button type="submit" className="login-submit">
          Sign in
        </button>

        <p className="login-hint">Try mercel@example.com / password123</p>
      </form>

      {showSuccess && (
        <SuccessPopUp
          title="Welcome back"
          message={`Signed in as ${loggedInUser?.name}. Taking you to the dashboard.`}
          onClose={handleSuccessClose}
        />
      )}

      {showFailed && (
        <FailedPopUp
          title="Sign in failed"
          message="That email and password combination doesn't match our records."
          onClose={() => setShowFailed(false)}
        />
      )}
    </div>
  );
}

import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";
// import { login } from "../../store/session";
import * as sessionActions from "../../store/session";
import "./LoginForm.css";

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to="/home" />;
  }

  const demoLogin = (e) => {
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // this does 2 things
    // 1. resetting the error array
    // 2. triggers re-render after succesful submission which allows the user to be redirected
    //      from the if statement above
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();

        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  return (
    <div className="login-container">
      <div className="login-form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="credential-container">
            <label>
              Username or Email
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="password-container">
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="login-button-container">
            <button type="submit">Log In</button>
          </div>
          <div className="demo-login-container">
            <button type="button" onClick={demoLogin}>
              Demo Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default LoginFormPage;

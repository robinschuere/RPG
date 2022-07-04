import { Navigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
import { register } from '../services/rpgApi';

const Login = () => {
  const [getEmail, setEmail] = createSignal('');
  const [getPassword, setPassword] = createSignal('');
  const [getMessage, setMessage] = createSignal('');
  const [getError, setError] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (getEmail() && getPassword()) {
      const { error } = await register(getEmail(), getPassword());
      if (error) {
        setError(error.message);
      } else {
        setMessage('Your user was created. An email was sent for verification');
      }
    }
  };

  const handleForgotPassword = (e: Event) => {
    e.preventDefault();
    if (getEmail()) {
      console.log('TO BE IMPLEMENTED');
    }
  };

  return (
    <>
      {!getMessage() && (
        <form>
          Register a new account
          <input
            type="text"
            placeholder="Email address"
            value={getEmail()}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={getPassword()}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button onClick={handleSubmit} type="button">
            Register
          </button>
        </form>
      )}
      {getMessage() && (
        <div>
          <p>{getMessage()}</p>
        </div>
      )}
      {getError() && (
        <div>
          <p>{getError()}</p>
          <button onClick={handleForgotPassword} type="button">
            Forgot Password?
          </button>
        </div>
      )}
    </>
  );
};

export default Login;

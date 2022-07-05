import { Link, useNavigate } from 'solid-app-router';
import { Form } from 'solid-bootstrap';
import { createSignal } from 'solid-js';
import { StateStore, useState } from '../providers/StateProvider';
import { login } from '../services/rpgApi';

const Login = () => {
  const navigate = useNavigate();
  const [, { loginUser }] = useState() as StateStore;

  const [getEmail, setEmail] = createSignal('');
  const [getPassword, setPassword] = createSignal('');
  const [getError, setError] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (getEmail() && getPassword()) {
      const { error, data: tokenData } = await login(getEmail(), getPassword());
      if (error) {
        setError(error.message);
      } else {
        await loginUser(tokenData.token);
        navigate('/');
      }
    }
  };

  return (
    <form>
      Login
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
        Login
      </button>
      <div>
        <Link href="/forget">Forgot password?</Link>
        <Link href="/register">Or register?</Link>
      </div>
      {getError() && (
        <div>
          <p>{getError()}</p>
        </div>
      )}
    </form>
  );
};

export default Login;

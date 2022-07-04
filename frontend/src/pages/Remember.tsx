import { useSearchParams } from 'solid-app-router';
import { createSignal } from 'solid-js';
import { remember } from '../services/rpgApi';

const Remember = () => {
  const [searchParams] = useSearchParams();
  const [getPassword, setPassword] = createSignal('');
  const [getMessage, setMessage] = createSignal('');
  const [getError, setError] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (getPassword()) {
      const { error } = await remember(searchParams.token, getPassword());
      if (error) {
        setError(error.message);
      } else {
        setMessage('Your user was created. An email was sent for verification');
      }
    }
  };

  return (
    <>
      {!getMessage() && (
        <form>
          Register a new account
          <input type="email" placeholder="email" value={searchParams.email} />
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
        </div>
      )}
    </>
  );
};

export default Remember;

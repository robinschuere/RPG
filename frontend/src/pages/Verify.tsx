import { useSearchParams } from 'solid-app-router';
import { createSignal } from 'solid-js';
import { verify } from '../services/rpgApi';

const Verify = () => {
  const [searchParams] = useSearchParams();
  const [getPassword, setPassword] = createSignal('');
  const [getMessage, setMessage] = createSignal('');
  const [getError, setError] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (getPassword()) {
      const { error } = await verify(searchParams.token, getPassword());
      if (error) {
        setError(error.message);
      } else {
        setMessage('Your user is successfully verified.');
      }
    }
  };

  return (
    <>
      {!getMessage() && (
        <form>
          Verify account
          <input type="email" placeholder="email" value={searchParams.email} />
          <input
            type="password"
            placeholder="Password"
            value={getPassword()}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
          <button onClick={handleSubmit} type="button">
            Verify
          </button>
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
        </form>
      )}
    </>
  );
};

export default Verify;

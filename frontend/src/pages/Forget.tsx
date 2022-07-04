import { Navigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
import { forget, register } from '../services/rpgApi';

const Forget = () => {
  const [getEmail, setEmail] = createSignal('');
  const [getMessage, setMessage] = createSignal('');
  const [getError, setError] = createSignal('');

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (getEmail()) {
      const { error } = await forget(getEmail());
      if (error) {
        setError(error.message);
      } else {
        setMessage('An email was sent');
      }
    }
  };

  return (
    <>
      {!getMessage() && (
        <form>
          <div>
            <p>Forgot your password?</p>
          </div>
          <div>
            <input
              type="text"
              placeholder="Email address"
              value={getEmail()}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div>
            <button onClick={handleSubmit} type="button">
              Ask a new password
            </button>
          </div>
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

export default Forget;

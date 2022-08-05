import { Navigate } from 'solid-app-router';
import { Col, Container, Form, Row, Button, Alert } from 'solid-bootstrap';
import { createSignal } from 'solid-js';
import FormLayout from '../components/FormLayout';
import { forget, register } from '../services/meRequests';

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

  const handleForgotPassword = async () => {
    if (getEmail()) {
      const { error } = await forget(getEmail());
      if (error) {
        setError(error.message);
      } else {
        setMessage('Remember password email sent. Check your email.');
      }
    }
  };

  return (
    <Container>
      {getMessage() && (
        <Alert variant="success" dismissible>
          {getMessage()}
        </Alert>
      )}
      {getError() && (
        <Alert variant="danger" dismissible>
          <Alert.Heading>{getError()}</Alert.Heading>
          <Button
            style={{ 'margin-top': '25px' }}
            onClick={handleForgotPassword}
          >
            {' '}
            Forgot Pasword?
          </Button>
        </Alert>
      )}
      <FormLayout>
        <Form style={{ 'margin-top': '25px', 'margin-bottom': '25px' }}>
          <h1>Register a new account</h1>
          <Form.Group style={{ 'margin-top': '25px' }}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email Address"
              value={getEmail()}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </Form.Group>
          <Form.Group style={{ 'margin-top': '25px' }}>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={getPassword()}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </Form.Group>
          <Button style={{ 'margin-top': '25px' }} onClick={handleSubmit}>
            Register
          </Button>
        </Form>
      </FormLayout>
    </Container>
  );
};

export default Login;

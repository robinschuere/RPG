import { Navigate } from 'solid-app-router';
import { Alert, Button, Col, Container, Form, Row } from 'solid-bootstrap';
import { createSignal } from 'solid-js';
import FormLayout from '../components/FormLayout';
import { forget, register } from '../services/meRequests';

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
    <Container>
      {getMessage() && (
        <Alert variant="success" dismissible>
          {getMessage()}
        </Alert>
      )}
      {getError() && (
        <Alert variant="danger" dismissible>
          {getError()}
        </Alert>
      )}
      <FormLayout>
        <Form style={{ 'margin-top': '25px', 'margin-bottom': '25px' }}>
          <h1>Forgot your password?</h1>
          <Form.Group style={{ 'margin-top': '25px' }}>
            <Form.Label>Email</Form.Label>
            <Form.Control
              placeholder="Email Address"
              value={getEmail()}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </Form.Group>
          <Button style={{ 'margin-top': '25px' }} onClick={handleSubmit}>
            Ask a new password
          </Button>
        </Form>
      </FormLayout>
    </Container>
  );
};

export default Forget;

import { useSearchParams } from 'solid-app-router';
import { Alert, Button, Col, Container, Form, Row } from 'solid-bootstrap';
import { createSignal } from 'solid-js';
import FormLayout from '../components/FormLayout';
import { remember } from '../services/meRequests';

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
        setMessage('Your user was reset.');
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
          <h1>Reset account</h1>
          <Form.Group style={{ 'margin-top': '25px' }}>
            <Form.Label>Email</Form.Label>
            <Form.Control value={searchParams.email} disabled />
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
            Reset Account
          </Button>
        </Form>
      </FormLayout>
    </Container>
  );
};

export default Remember;

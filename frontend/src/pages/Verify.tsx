import { useSearchParams } from 'solid-app-router';
import { Alert, Button, Col, Container, Form, Row } from 'solid-bootstrap';
import { createSignal } from 'solid-js';
import { verify } from '../services/meRequests';

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
      <Row style={{ 'margin-top': '25px' }}>
        <Col xs={4}></Col>
        <Col
          class="text-center"
          style={{ border: '1px solid grey', 'border-radius': '25px' }}
          xs={4}
        >
          <Form style={{ 'margin-top': '25px', 'margin-bottom': '25px' }}>
            <h1>Verify account</h1>
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
              Verify
            </Button>
          </Form>
        </Col>
        <Col xs={4}></Col>
      </Row>
    </Container>
  );
};

export default Verify;

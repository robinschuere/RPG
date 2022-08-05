import { Link, useNavigate } from 'solid-app-router';
import { Alert, Button, Col, Container, Form, Row } from 'solid-bootstrap';
import { createSignal } from 'solid-js';
import FormLayout from '../components/FormLayout';
import { StateStore, useState } from '../providers/StateProvider';
import { login } from '../services/meRequests';

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

  const handleKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <Container>
      {getError() && (
        <Alert variant="danger" dismissible>
          {getError()}
        </Alert>
      )}
      <FormLayout>
        <Form style={{ 'margin-top': '25px', 'margin-bottom': '25px' }}>
          <h1>Login</h1>
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
              onKeyUp={(e) => handleKeyUp(e)}
            />
          </Form.Group>
          <Button style={{ 'margin-top': '25px' }} onClick={handleSubmit}>
            Login
          </Button>
          <Row style={{ 'margin-top': '25px' }}>
            <Col>
              <Link href="/forget">Forgot password?</Link>
            </Col>
            <Col>
              <Link href="/register">Or register?</Link>
            </Col>
          </Row>
        </Form>
      </FormLayout>
    </Container>
  );
};

export default Login;

import { Form, Container } from 'solid-bootstrap';
import { StateStore, useState } from '../providers/StateProvider';

const User = () => {
  const [state] = useState() as StateStore;

  return (
    <Container fluid>
      <Form>
        <Form.Text id="passwordHelpBlock">User</Form.Text>
        <Form.Group class="mb-3" controlId="formBasicFirstname">
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter firstname"
            value={state.user?.firstname}
            disabled
          />
        </Form.Group>
        <Form.Group class="mb-3" controlId="formBasicLastname">
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter lastname"
            value={state.user?.lastname}
            disabled
          />
        </Form.Group>
        <Form.Group class="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={state.user?.email}
            disabled
          />
        </Form.Group>
      </Form>
    </Container>
  );
};

export default User;

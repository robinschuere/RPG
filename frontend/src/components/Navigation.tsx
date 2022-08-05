import { StateStore, useState } from '../providers/StateProvider';
import {
  Nav,
  Navbar,
  Container,
  Button,
  Spinner,
  Tooltip,
} from 'solid-bootstrap';
import { useNavigate } from 'solid-app-router';

const Navigation = () => {
  const navigate = useNavigate();
  const [state, { logoutUser }] = useState() as StateStore;

  const handleLogout = async () => {
    await logoutUser();
    navigate('/');
  };

  return (
    <Navbar bg="light" expand="sm" fixed="top" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/">RPG</Navbar.Brand>
        {state.isRetrying && (
          <Spinner animation="grow" variant="danger" size="sm" role="status" />
        )}
        {state.token && <Nav.Link href="/characters">Characters</Nav.Link>}
        {state.token && state.user?.admin && (
          <Nav.Link href={'/admin'}>Admin panel</Nav.Link>
        )}
        <Navbar.Collapse class="justify-content-end">
          {state.token && (
            <>
              <Navbar.Text>Signed in as: </Navbar.Text>
              <Nav.Link href="/user">{state.user?.email}</Nav.Link>
            </>
          )}

          {!state.token && <Nav.Link href="/login">Login</Nav.Link>}
          {state.token && <Button onClick={handleLogout}>Logout</Button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;

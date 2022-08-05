import { Col, Container, Nav, Row } from 'solid-bootstrap';

const AdminPanel = () => {
  return (
    <Container>
      <Row>
        <Col class="text-center">
          <h1>Admin Panel</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Nav.Link href={'/admin/monsters'}>Monsters</Nav.Link>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPanel;

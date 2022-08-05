import { Col, Row } from 'solid-bootstrap';

interface FormLayoutProps {
  children: any;
}

const FormLayout = (props: FormLayoutProps) => {
  return (
    <Row style={{ 'margin-top': '25px' }}>
      <Col />
      <Col
        class="text-center"
        style={{ border: '1px solid grey', 'border-radius': '25px' }}
        sm={8}
        md={6}
      >
        {props.children}
      </Col>
      <Col />
    </Row>
  );
};

export default FormLayout;

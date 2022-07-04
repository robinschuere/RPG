import { Col } from 'solid-bootstrap';

type NameValueColumnProps = {
  name?: string;
  value?: number | string;
  [key: string]: any;
};

const NameValueColumn = (props: NameValueColumnProps) => {
  const { name, value, ...colProps } = props;
  return (
    <Col
      style={{ border: '1px solid grey' }}
      {...colProps}
    >{`${props.name}: ${props.value}`}</Col>
  );
};

export default NameValueColumn;

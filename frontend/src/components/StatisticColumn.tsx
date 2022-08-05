import { Button, Col, Row } from 'solid-bootstrap';

type StatisticColumnProps = {
  name: string;
  getPoints?: () => any;
  hasPointsToSpend?: boolean;
  onPointAdd?: (name: string) => void;
  onPointRemove?: (name: string) => void;
  getCharacter: () => any;
  [key: string]: any;
};

const StatisticColumn = (props: StatisticColumnProps) => {
  const {
    name,
    value,
    hasPointsToSpend,
    getPoints = () => {},
    onPointAdd,
    onPointRemove,
    getCharacter = () => {},
    ...colProps
  } = props;

  const handleAdd = () => {
    if (onPointAdd) {
      onPointAdd(name);
    }
  };

  const handleRemove = () => {
    if (onPointRemove) {
      onPointRemove(name);
    }
  };

  return (
    <Col style={{ border: '1px solid grey' }} {...colProps}>
      <Row>
        <Col xs={6}>{`${props.name.substring(0, 3).toUpperCase()}: ${
          props.getCharacter().traits[name]
        }`}</Col>
        <Col xs={4}>
          {getPoints()[name] > 0 && onPointRemove && (
            <Button size="sm" variant="link" onClick={handleRemove}>
              {`- ${getPoints()[name]}`}
            </Button>
          )}
        </Col>
        <Col xs={2}>
          {props.hasPointsToSpend && onPointAdd && (
            <Button size="sm" variant="link" onClick={handleAdd}>
              {`+`}
            </Button>
          )}
        </Col>
      </Row>
    </Col>
  );
};

export default StatisticColumn;

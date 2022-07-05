import { Button, Col, Container, Row, Stack } from 'solid-bootstrap';
import { IdleStageValues } from '../../../../shared/types/CharacterState';
import { LocationDirection } from '../../../../shared/types/LocationDirection';
import { directions } from '../../../../shared/constants';
import { StateStore, useState } from '../../providers/StateProvider';

const GameDirections = () => {
  const [state, { sendAction }] = useState() as StateStore;

  const handleNavigate = (locationId: number) => {
    if (!state.characterState) {
      return;
    }
    sendAction({
      eventType: 'characterNavigates',
      characterId: state.characterState.characterId,
      values: { locationId },
    });
  };

  const getDirection = (direction: string) => {
    const stageValues = state.characterState?.stageValues as IdleStageValues;
    const locationDirection = stageValues.locationDirections?.find(
      (s: LocationDirection) => s.direction === direction,
    );
    if (locationDirection) {
      return (
        <Button
          size="lg"
          onClick={() => handleNavigate(locationDirection?.directionLocationId)}
        >
          {locationDirection.directionLocation?.name}
        </Button>
      );
    }
    return <Button disabled>{direction}</Button>;
  };

  return (
    <Container>
      <Stack gap={5}>
        <Row>
          <Col class="d-grid" xs={4}>
            {getDirection(directions.NORTHWEST)}
          </Col>
          <Col class="d-grid" xs={4}>
            {getDirection(directions.NORTH)}
          </Col>
          <Col class="d-grid" xs={4}>
            {getDirection(directions.NORTHEAST)}
          </Col>
        </Row>
        <Row />
        <Row>
          <Col class="d-grid" xs={4}>
            {getDirection(directions.WEST)}
          </Col>
          <Col class="d-grid" xs={4}>
            YOU ARE HERE
          </Col>
          <Col class="d-grid" xs={4}>
            {getDirection(directions.EAST)}
          </Col>
        </Row>
        <Row />
        <Row>
          <Col class="d-grid" xs={4}>
            {getDirection(directions.SOUTHWEST)}
          </Col>
          <Col class="d-grid" xs={4}>
            {getDirection(directions.SOUTH)}
          </Col>
          <Col class="d-grid" xs={4}>
            {getDirection(directions.SOUTHEAST)}
          </Col>
        </Row>
      </Stack>
    </Container>
  );
};

export default GameDirections;

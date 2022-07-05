import { StateStore, useState } from '../../providers/StateProvider';
import { Button, Col, Container, Row, Stack } from 'solid-bootstrap';
import { TrackCombatStageValues } from '../../../../shared/types/CharacterState';

const TrackCombatScreen = () => {
  const [state, { sendAction }] = useState() as StateStore;

  const handleFightMonster = () => {
    if (!state.characterState) {
      return;
    }
    sendAction({
      eventType: 'characterAcceptsFight',
      characterId: state.characterState.characterId,
    });
  };

  const handleGoAway = () => {
    if (!state.characterState) {
      return;
    }
    sendAction({
      eventType: 'characterGoesIdle',
      characterId: state.characterState.characterId,
    });
  };

  const getStageValues = () => {
    return state.characterState?.stageValues as TrackCombatStageValues;
  };

  return (
    <Container fluid>
      {state.characterState?.stageValues! && (
        <Stack gap={5}>
          <Row style={{ 'margin-top': '5px' }}>
            <Col xs={1} />
            <Col xs={10}>You encounter a {getStageValues().monster?.name}</Col>
            <Col xs={1} />
          </Row>
          <Row style={{ 'margin-top': '5px' }}>
            <Col xs={1} />
            <Col>What are you going to do?</Col>
            <Col xs={1} />
          </Row>
          <Row style={{ 'margin-bottom': '5px' }}>
            <Col xs={3} />
            <Col>
              <Button onClick={handleFightMonster}>FIGHT!</Button>
            </Col>
            <Col>
              <Button onClick={handleGoAway}>Run</Button>
            </Col>
            <Col xs={3} />
          </Row>
        </Stack>
      )}
    </Container>
  );
};

export default TrackCombatScreen;

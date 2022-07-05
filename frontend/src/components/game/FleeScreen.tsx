import { Button, Col, Container, Row, Stack } from 'solid-bootstrap';
import { roundTypes } from '../../../../shared/constants';
import { CombatStageValues } from '../../../../shared/types/CharacterState';
import { StateStore, useState } from '../../providers/StateProvider';
import Screen from './combat/Screen';

const FleeScreen = () => {
  const [state, { sendAction }] = useState() as StateStore;

  const getStageValues = () => {
    const stageValues = state.characterState?.stageValues as CombatStageValues;
    return stageValues;
  };

  const handleContinue = () => {
    if (state.characterState) {
      sendAction({
        characterId: state.characterState.characterId,
        eventType: 'characterFled',
      });
    }
  };

  return (
    <Container>
      {state.characterState?.stageValues && (
        <Stack gap={4}>
          <Screen />
          <Row>
            <Col></Col>
            <Col />
            <Col>
              <Button
                onClick={handleContinue}
                disabled={getStageValues().round === roundTypes.MONSTER}
              >
                Continue
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Stack>
      )}
    </Container>
  );
};

export default FleeScreen;

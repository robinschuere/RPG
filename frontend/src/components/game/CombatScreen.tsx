import { Button, Col, Container, Row, Stack } from 'solid-bootstrap';
import { roundTypes } from '../../../../shared/constants';
import { CombatStageValues } from '../../../../shared/types/CharacterState';
import { StateStore, useState } from '../../providers/StateProvider';
import Screen from './combat/Screen';

const CombatScreen = () => {
  const [state, { sendAction }] = useState() as StateStore;

  const getStageValues = () => {
    const stageValues = state.characterState?.stageValues as CombatStageValues;
    return stageValues;
  };

  const handleAutoAttack = () => {
    if (state.characterState) {
      if (getStageValues().autoAttack) {
        sendAction({
          characterId: state.characterState.characterId,
          eventType: 'characterDoesFightingAction',
          values: {
            autoAttack: false,
          },
        });
      } else {
        sendAction({
          characterId: state.characterState.characterId,
          eventType: 'characterDoesFightingAction',
          values: {
            autoAttack: true,
          },
        });
      }
    }
  };

  const handleAttack = () => {
    if (state.characterState) {
      sendAction({
        characterId: state.characterState.characterId,
        eventType: 'characterDoesFightingAction',
      });
    }
  };

  const handleFlee = () => {
    if (state.characterState) {
      sendAction({
        characterId: state.characterState.characterId,
        eventType: 'characterFleesFromAction',
      });
    }
  };

  return (
    <Container>
      {state.characterState?.stageValues && (
        <Stack gap={4}>
          <Screen />

          <Row style={{ 'margin-top': '25px' }}>
            <Col xs={8}>
              <Row>
                <Col xs={6} class="d-grid">
                  <Button
                    size="lg"
                    onClick={handleAutoAttack}
                    disabled={getStageValues().round === roundTypes.MONSTER}
                  >
                    {getStageValues().autoAttack ? 'Stop' : 'Auto - Attack'}
                  </Button>
                </Col>
                <Col xs={6} class="d-grid">
                  {!getStageValues().autoAttack && (
                    <Button
                      size="lg"
                      onClick={handleAttack}
                      disabled={getStageValues().round === roundTypes.MONSTER}
                    >
                      Attack
                    </Button>
                  )}
                </Col>
              </Row>
            </Col>
            <Col xs={2} />
            <Col xs={2} class="d-grid">
              {!getStageValues().autoAttack && (
                <Button
                  size="lg"
                  onClick={handleFlee}
                  disabled={
                    getStageValues().autoAttack ||
                    getStageValues().round === roundTypes.MONSTER
                  }
                >
                  Flee
                </Button>
              )}
            </Col>
          </Row>
        </Stack>
      )}
    </Container>
  );
};

export default CombatScreen;

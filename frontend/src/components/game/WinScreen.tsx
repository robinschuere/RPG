import { Button, Col, Container, Row, Stack } from 'solid-bootstrap';
import { StateStore, useState } from '../../providers/StateProvider';
import Screen from './combat/Screen';

const WinScreen = () => {
  const [state, { sendAction }] = useState() as StateStore;

  const handleContinue = () => {
    if (state.characterState) {
      sendAction({
        characterId: state.characterState.characterId,
        eventType: 'characterWins',
      });
    }
  };

  return (
    <Container>
      {state.characterState?.stageValues && (
        <Stack gap={4}>
          <Screen />
          <Row style={{ 'margin-top': '25px' }}>
            <Col class="text-center">
              <Button variant="success" size="lg" onClick={handleContinue}>
                Continue
              </Button>
            </Col>
          </Row>
        </Stack>
      )}
    </Container>
  );
};

export default WinScreen;

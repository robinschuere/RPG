import { Row, Stack, Button } from 'solid-bootstrap';
import { TrackStageValues } from '../../../../shared/types/CharacterState';
import { StateStore, useState } from '../../providers/StateProvider';

const TrackScreen = () => {
  const [state, { sendAction }] = useState() as StateStore;

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
    return state.characterState?.stageValues as TrackStageValues;
  };

  return (
    <Stack>
      <Row>{getStageValues().trackingText}</Row>
      <Row>
        <Button onClick={handleGoAway}>Go away</Button>
      </Row>
    </Stack>
  );
};

export default TrackScreen;

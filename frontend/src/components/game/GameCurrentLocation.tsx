import { Card } from 'solid-bootstrap';
import { StateStore, useState } from '../../providers/StateProvider';

const GameCurrentLocation = () => {
  const [state] = useState() as StateStore;

  return (
    <Card.Header>
      {state.characterState &&
        `You are standing at ${state.characterState.location?.name}`}
    </Card.Header>
  );
};

export default GameCurrentLocation;

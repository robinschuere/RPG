import { Navigate } from 'solid-app-router';
import { Container, Spinner } from 'solid-bootstrap';
import GameCard from '../components/game/GameCard';
import { StateStore, useState } from '../providers/StateProvider';

const Game = () => {
  const [state] = useState() as StateStore;

  return (
    <Container fluid>
      {state.isRetrying && (
        <>
          <Spinner animation="border" role="status" />
          Connection with the server was lost, trying to reconnect... attempt{' '}
          {state.retryAttempt} of 5
        </>
      )}
      {!state.isRetrying && !state.characterState && (
        <>
          <Spinner animation="border" role="status" />
          Loading character
        </>
      )}
      {!state.isRetrying && state.characterState && <GameCard />}
    </Container>
  );
};

export default Game;

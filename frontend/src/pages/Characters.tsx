import { For } from 'solid-js';
import { StateStore, useState } from '../providers/StateProvider';
import Character from '../components/Character';
import { Col, Container, Row, Spinner } from 'solid-bootstrap';
import GameCard from '../components/game/GameCard';
import NewCharacter from '../components/NewCharacter';
import { useNavigate } from 'solid-app-router';

const Characters = () => {
  const navigate = useNavigate();
  const [state, { sendAction }] = useState() as StateStore;

  const handlePlay = (characterId: string) => {
    sendAction({ eventType: 'loginCharacter', characterId });
  };

  const handleCreateCharacter = () => {
    navigate('/characters/new');
  };

  return (
    <>
      {state.characterState && (
        <>
          <Container fluid>
            <GameCard />
          </Container>
        </>
      )}
      {!state.characterState && (
        <Container>
          <Row>
            <Col class="text-center">
              <h1>Characters</h1>
            </Col>
          </Row>
          <Row>
            <For each={state.characters}>
              {(character: any) => (
                <Col xs={6}>
                  <Character character={character} onClick={handlePlay} />
                </Col>
              )}
            </For>
            {state.newCharacters.amount > 0 && (
              <Col xs={6}>
                <NewCharacter onClick={handleCreateCharacter} />
              </Col>
            )}
          </Row>
        </Container>
      )}
    </>
  );
};

export default Characters;

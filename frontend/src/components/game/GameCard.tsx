import { Card, Tab, Tabs } from 'solid-bootstrap';
import { screenTypes } from '../../../../shared/constants';
import { StateStore, useState } from '../../providers/StateProvider';
import GameCurrentLocation from './GameCurrentLocation';
import GameGear from './GameGear';
import GameInventory from './GameInventory';
import GameStats from './GameStats';
import GameWorld from './GameWorld';

const GameCard = () => {
  const [state, { sendAction }] = useState() as StateStore;

  if (!state.characterState) {
    return <div />;
  }
  const openScreen = (screenType: string | null) => {
    if (state.characterState) {
      sendAction({
        characterId: state.characterState.characterId,
        eventType: 'setScreen',
        values: { screenType: screenType || screenTypes.WORLD },
      });
    }
  };

  return (
    <Card class="text-center mt-4">
      <GameCurrentLocation />
      <Card.Body style={{ height: '50rem', 'overflow-y': 'scroll' }}>
        {state.characterState?.screenType === screenTypes.INVENTORY && (
          <GameInventory />
        )}
        {state.characterState?.screenType === screenTypes.STATISTICS && (
          <GameStats />
        )}
        {state.characterState?.screenType === screenTypes.WORLD && (
          <GameWorld />
        )}
        {state.characterState?.screenType === screenTypes.GEAR && <GameGear />}
      </Card.Body>
      <Card.Footer>
        <Tabs
          activeKey={state.characterState.screenType}
          id="uncontrolled-tab-example"
          onSelect={(k) => openScreen(k)}
        >
          <Tab eventKey={screenTypes.WORLD} title="World" />
          <Tab eventKey={screenTypes.INVENTORY} title="Inventory" />
          <Tab eventKey={screenTypes.GEAR} title="Gear" />
          <Tab eventKey={screenTypes.STATISTICS} title="Stats" />
        </Tabs>
      </Card.Footer>
    </Card>
  );
};

export default GameCard;

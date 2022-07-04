import { Button, Col, Row, Stack } from 'solid-bootstrap';
import { For } from 'solid-js';
import { locationTypes } from '../../../../shared/constants';
import { IdleStageValues } from '../../../../shared/types/CharacterState';
import { Location } from '../../../../shared/types/Location';
import { LocationShop } from '../../../../shared/types/LocationShop';
import { StateStore, useState } from '../../providers/StateProvider';
import GameDirections from './GameDirections';

const IdleScreen = () => {
  const [state, { sendAction }] = useState() as StateStore;
  const handleTracking = () => {
    if (!state.characterState) {
      return;
    }
    sendAction({
      eventType: 'characterGoesTracking',
      characterId: state.characterState.characterId,
    });
  };

  const handleShop = (id: number) => {
    if (!state.characterState) {
      return;
    }
    sendAction({
      eventType: 'characterGoesShopping',
      characterId: state.characterState.characterId,
      values: {
        id,
      },
    });
  };

  const defineTrackingText = (location: Location) => {
    switch (location.locationType) {
      case locationTypes.TRAINING_GROUNDS:
        return 'Search for an opponent';
      default:
        'Start tracking';
    }
  };

  return (
    <Stack gap={5}>
      {state.characterState?.location && state.characterState?.hasMonsters && (
        <Row>
          <Col />
          <Col>
            <Button onClick={handleTracking}>
              {defineTrackingText(state.characterState?.location)}
            </Button>
          </Col>
          <Col />
        </Row>
      )}
      {state.characterState?.location && state.characterState?.shops && (
        <>
          <Row>
            <Col />
            <Col class="text-center">
              <u>Shops</u>
            </Col>
            <Col />
          </Row>
          <For each={state.characterState?.shops}>
            {(shop: LocationShop) => {
              return (
                <Row>
                  <Col />
                  <Col>{shop.name}</Col>
                  <Col>
                    <Button onClick={() => handleShop(shop.id)}>
                      Go to shop
                    </Button>
                  </Col>
                </Row>
              );
            }}
          </For>
        </>
      )}
      <Row>
        <Col>
          <GameDirections />
        </Col>
      </Row>
    </Stack>
  );
};

export default IdleScreen;

import { Col, Container, Row, Stack } from 'solid-bootstrap';
import { For } from 'solid-js';
import { InventoryItem } from '../../../../shared/types/CharacterState';
import { StateStore, useState } from '../../providers/StateProvider';
import NameValueColumn from '../NameValueColumn';

const GameInventory = () => {
  const [state, { sendAction }] = useState() as StateStore;

  const getItem = (itemId: number) => {
    return state.items.find((s) => s.id === itemId)?.name;
  };

  return (
    <Container>
      <Stack gap={2}>
        <Row>
          <Col />
          <Col>
            <u>Inventory</u>
          </Col>
          <Col />
        </Row>
        <For each={state.characterState?.inventory}>
          {(inventoryItem: InventoryItem) => {
            return (
              <Row>
                <NameValueColumn
                  name={getItem(inventoryItem.itemId)}
                  value={inventoryItem.amount}
                />
              </Row>
            );
          }}
        </For>
      </Stack>
    </Container>
  );
};

export default GameInventory;

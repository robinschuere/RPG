import {
  Button,
  Col,
  Row,
  Stack,
  Tab,
  TabContent,
  Tabs,
} from 'solid-bootstrap';
import { For } from 'solid-js';
import {
  InventoryItem,
  ShopStageValues,
} from '../../../../shared/types/CharacterState';
import { Item } from '../../../../shared/types/Item';
import { StateStore, useState } from '../../providers/StateProvider';

const ShopScreen = () => {
  const [state, { sendAction }] = useState() as StateStore;

  const getStageValues = () =>
    state.characterState?.stageValues as ShopStageValues;

  const getItem = (itemId: number): Item | undefined => {
    const item = state.items.find((s) => s.id === itemId);
    return item;
  };

  const handleBuyItem = (shopId: number, itemId: number) => {
    if (state.characterState) {
      sendAction({
        characterId: state.characterState.characterId,
        eventType: 'characterBuysItem',
        values: {
          shopId,
          itemId,
        },
      });
    }
  };

  const handleSellItem = (inventoryItemId: string, shopId: number) => {
    if (state.characterState) {
      sendAction({
        characterId: state.characterState.characterId,
        eventType: 'characterSellsItem',
        values: {
          inventoryItemId,
          shopId,
        },
      });
    }
  };

  return (
    <Stack>
      <Row>
        <Col />
        <Col>Welcome at {getStageValues().shop.name}</Col>
        <Col />
      </Row>
      <Row>
        <Col />
        <Col>
          My name is {getStageValues().shop.sales.shopkeeper}, how can I help
          you today?
        </Col>
        <Col />
      </Row>
      <Tabs>
        <Tab eventKey="sale" title="For Sale">
          <TabContent>
            <For each={getStageValues().shop.sales.items}>
              {(itemId) => {
                const item = getItem(itemId);
                if (!item) return null;
                return (
                  <Row>
                    <Col>{item?.name}</Col>
                    <Col>
                      {Math.floor(
                        item.worth * getStageValues().shop.sales.salePercentage,
                      )}
                    </Col>
                    <Col>
                      <Button
                        onClick={() =>
                          handleBuyItem(getStageValues().shop.id, itemId)
                        }
                      >
                        BUY
                      </Button>
                    </Col>
                  </Row>
                );
              }}
            </For>
          </TabContent>
        </Tab>
        <Tab eventKey="buy" title="To sell">
          <TabContent>
            <For each={state.characterState?.inventory}>
              {({ id, itemId, amount }: InventoryItem) => {
                const item = getItem(itemId);
                if (!item) return null;
                return (
                  <Row>
                    <Col>{`${item?.name} (${amount})`}</Col>
                    <Col>
                      {Math.floor(
                        item.worth * getStageValues().shop.sales.buyPercentage,
                      )}{' '}
                      / item
                    </Col>
                    <Col></Col>
                    <Col>
                      <Button
                        onClick={() =>
                          handleSellItem(id, getStageValues().shop.id)
                        }
                      >
                        SELL
                      </Button>
                    </Col>
                  </Row>
                );
              }}
            </For>
          </TabContent>
        </Tab>
      </Tabs>
    </Stack>
  );
};

export default ShopScreen;

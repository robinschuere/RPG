import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { TemporaryDrop } from '../../../shared/types/CharacterState';
import { LocationShop } from '../../../shared/types/LocationShop';
import { addItemToInventoryAfterSale } from 'src/helpers/inventoryHelper';
import { v4 as uuid } from 'uuid';
import { Item } from '../../../shared/types/Item';

const characterStateStore = getEntity('character_states');
const locationShopStore = getEntity('location_shops');
const itemStore = getEntity('items');

export const characterGoesTracking = async ({
  existingState,
  event,
}: EventHandlerProps) => {
  if (!existingState || existingState.stageType !== stageTypes.SHOP) {
    return;
  }
  // check if the currentLocation has this shop
  const shop: LocationShop = await locationShopStore
    .getTable()
    .where({ locationId: existingState.locationId, id: event.values.shopId })
    .first()
    .select();

  if (shop && shop.sales.items.includes(event.values.itemId)) {
    const item: Item = await itemStore.getById(event.values.itemId);
    const cost = Math.floor(shop.sales.salePercentage * item.worth);
    const newItem: TemporaryDrop = {
      tempId: uuid(),
      item,
      amount: event.values.amount,
    };
    const inventory = addItemToInventoryAfterSale(existingState, newItem, cost);
    await characterStateStore.update(existingState.id, {
      inventory,
    });
  }
  return;
};

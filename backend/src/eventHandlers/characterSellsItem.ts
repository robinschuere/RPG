import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { LocationShop } from '../../../shared/types/LocationShop';
import {
  getInventoryItem,
  removeItemFromInventoryAfterSale,
} from 'src/helpers/inventoryHelper';

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

  if (shop) {
    const inventoryItem = getInventoryItem(
      existingState,
      event.values.inventoryItemId,
    );
    if (!inventoryItem) {
      return;
    }
    const item = await itemStore.getById(inventoryItem.itemId);
    const cost = Math.floor(shop.sales.buyPercentage * item.worth);
    const totalCost = cost * (event.values.amount || 1);
    const inventory = removeItemFromInventoryAfterSale(
      existingState,
      event.values.inventoryItemId,
      totalCost,
      event.values.amount || 1,
    );
    await characterStateStore.update(existingState.id, {
      inventory,
    });
  }
  return;
};

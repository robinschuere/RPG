import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';

const characterStateStore = getEntity('character_states');
const locationShopStore = getEntity('location_shops');

export const characterGoesTracking = async ({
  existingState,
  event,
}: EventHandlerProps) => {
  if (!existingState || existingState.stageType !== stageTypes.IDLE) {
    return;
  }
  // check if the currentLocation has shops
  const shops = await locationShopStore
    .getTable()
    .where({ locationId: existingState.locationId })
    .count();

  if (shops > 0) {
    const shop = await locationShopStore.getById(event.values.id);
    console.debug('UPDATING STAGETYPE TO SHOP');
    await characterStateStore.update(existingState.id, {
      stageType: stageTypes.SHOP,
      stageValues: {
        shop,
      },
    });
  }
  return;
};

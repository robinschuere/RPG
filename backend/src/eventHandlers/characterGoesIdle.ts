import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { LocationDirection } from '../../../shared/types/LocationDirection';

const characterStateStore = getEntity('character_states');
const locationStore = getEntity('locations');
const locationDirectionStore = getEntity('location_directions');
const locationMonsterStore = getEntity('location_monsters');
const locationShopStore = getEntity('location_shops');

export const characterGoesIdle = async ({
  existingState,
}: EventHandlerProps) => {
  if (!existingState || existingState.stageType === stageTypes.IDLE) {
    return;
  }

  const locationDirections = await locationDirectionStore
    .getTable()
    .where({ currentLocationId: existingState.locationId })
    .select();

  const locationDirectionsWithLocation = await Promise.all(
    locationDirections.map(
      async (
        locationDirection: LocationDirection,
      ): Promise<LocationDirection> => {
        const location = await locationStore.getById(
          locationDirection.directionLocationId,
        );
        return { ...locationDirection, directionLocation: location };
      },
    ),
  );

  console.debug('UPDATING STAGETYPE TO IDLE');
  await characterStateStore.update(existingState.id, {
    stageType: stageTypes.IDLE,
    stageValues: {
      locationDirections: locationDirectionsWithLocation,
    },
  });
};

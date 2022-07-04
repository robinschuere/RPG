import { LocationDirection } from '../../../shared/types/LocationDirection';
import { getEntity } from '../helpers/entityHelper';
import { EventHandlerProps } from './types';

const locationStore = getEntity('locations');
const characterStateStore = getEntity('character_states');
const locationDirectionStore = getEntity('location_directions');
const locationMonsterStore = getEntity('location_monsters');

export const characterNavigates = async ({
  existingState,
  event,
}: EventHandlerProps) => {
  const { values } = event;
  // check if a characterState exists;
  if (!existingState) {
    return;
  }
  // first, check the location if it has the directionLocation as a new location
  const value = await locationDirectionStore
    .getTable()
    .where({
      currentLocationId: existingState.locationId,
      directionLocationId: values.locationId,
    })
    .first()
    .select();
  if (value) {
    // create a new state

    const locationDirections = await locationDirectionStore
      .getTable()
      .where({ currentLocationId: values.locationId })
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

    const locationMonsters = await locationMonsterStore
      .getTable()
      .where({ locationId: values.locationId })
      .select();

    console.debug('NAVIGATING TO A NEW LOCATION', values.locationId);
    await characterStateStore.update(existingState.id, {
      locationId: values.locationId,
      stageValues: {
        locationDirections: locationDirectionsWithLocation,
      },
    });
  }

  return;
};

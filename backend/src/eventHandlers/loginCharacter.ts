import { getEntity } from '../helpers/entityHelper';
import { CharacterState } from '../../../shared/types/CharacterState';
import { screenTypes, slotTypes, stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { defineCharacterStatistics } from '../helpers/combatHelper';
import { LocationDirection } from '../../../shared/types/LocationDirection';
import { monsterAttack } from './helpers/monsterAttack';
import config from '../../config';
import { characterTracks } from './helpers/characterTracks';
import { v4 as uuid } from 'uuid';

const eventStore = getEntity('events');
const characterStateStore = getEntity('character_states');
const locationDirectionStore = getEntity('location_directions');
const locationStore = getEntity('locations');

export const loginCharacter = async ({
  existingState,
  event,
  socket,
}: EventHandlerProps) => {
  if (existingState) {
    if (existingState.stageType === stageTypes.COMBAT) {
      setTimeout(
        () => monsterAttack({ socket, characterId: existingState.characterId }),
        config.game.timeBetweenRounds,
      );
    }
    if (existingState.stageType === stageTypes.TRACK) {
      setTimeout(
        () =>
          characterTracks({ socket, characterId: existingState.characterId }),
        config.game.timeBetweenTracks,
      );
    }
    return;
  }
  const { characterId } = event;
  // create a new state
  const state: CharacterState = {
    characterId,
    locationId: 1,
    stageType: stageTypes.IDLE,
    screenType: screenTypes.WORLD,
    inventory: [{ id: uuid(), itemId: 1, amount: 5 }],
    gear: [
      { slot: slotTypes.PANTS, itemId: 5 },
      { slot: slotTypes.BODY, itemId: 6 },
      { slot: slotTypes.FEET, itemId: 7 },
      { slot: slotTypes.WEAPON_HAND, itemId: 8 },
    ],
  };
  state.characterCombatState = await defineCharacterStatistics(state);
  const locationDirections = await locationDirectionStore
    .getTable()
    .where({ currentLocationId: 1 })
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
  state.stageValues = {
    locationDirections: locationDirectionsWithLocation,
  };

  await eventStore.update(event.id, { registered: true });
  await characterStateStore.insert({
    ...state,
    inventory: JSON.stringify(state.inventory),
    gear: JSON.stringify(state.gear),
  });

  return;
};

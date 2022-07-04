import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { CharacterState } from '../../../shared/types/CharacterState';
import config from '../../config';
import { characterTracks } from './helpers/characterTracks';
import { defineStageTypeText } from '../helpers/combatHelper';

const characterStateStore = getEntity('character_states');
const locationMonsterStore = getEntity('location_monsters');

export const characterGoesTracking = async ({
  existingState,
  socket,
}: EventHandlerProps) => {
  if (!existingState || existingState.stageType === stageTypes.TRACK) {
    return;
  }
  // check if the currentLocation has monsters
  const monster = await locationMonsterStore
    .getTable()
    .where({ locationId: existingState.locationId })
    .first()
    .select();

  if (monster) {
    console.debug('UPDATING STAGETYPE TO TRACKING');
    const trackingText = await defineStageTypeText(existingState.locationId);
    const [newState]: CharacterState[] = await characterStateStore.update(
      existingState.id,
      {
        stageType: stageTypes.TRACK,
        stageValues: {
          trackingText,
        },
      },
    );
    setTimeout(
      () => characterTracks({ socket, characterId: newState.characterId }),
      config.game.timeBetweenTracks,
    );
  }
  return;
};

import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { characterTracks } from './helpers/characterTracks';
import { defineStageTypeText } from '../helpers/combatHelper';

const characterStateEntities = getEntity('character_states');

export const characterDeclinesLoot = async ({
  existingState,
  socket,
}: EventHandlerProps) => {
  if (
    !existingState ||
    existingState.stageType !== stageTypes.COMBAT_WIN_DROP
  ) {
    return;
  }
  const trackingText = await defineStageTypeText(existingState.locationId);
  console.debug('UPDATING STAGETYPE TO TRACK');
  await characterStateEntities.update(existingState.id, {
    stageType: stageTypes.TRACK,
    stageValues: {
      trackingText,
    },
  });

  setTimeout(() =>
    characterTracks({ socket, characterId: existingState.characterId }),
  );
};

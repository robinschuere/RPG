import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { characterTracks } from './helpers/characterTracks';
import { defineStageTypeText } from '../helpers/combatHelper';

const characterStateEntities = getEntity('character_states');

export const characterDeclinesFind = async ({
  existingState,
  socket,
}: EventHandlerProps) => {
  if (!existingState || existingState.stageType !== stageTypes.TRACK_RESOURCE) {
    return;
  }
  console.debug('UPDATING STAGETYPE TO TRACK');
  const trackingText = await defineStageTypeText(existingState.locationId);
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

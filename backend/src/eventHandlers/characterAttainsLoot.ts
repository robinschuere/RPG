import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { addItemsToInventory } from '../helpers/inventoryHelper';
import { characterTracks } from './helpers/characterTracks';
import config from '../../config';
import { TrackResourceStageValues } from '../../../shared/types/CharacterState';
import { defineStageTypeText } from '../helpers/combatHelper';

const characterStateStore = getEntity('character_states');

export const characterAttainsLoot = async ({
  existingState,
  event,
  socket,
}: EventHandlerProps) => {
  if (
    !existingState ||
    existingState.stageType !== stageTypes.COMBAT_WIN_DROP
  ) {
    return;
  }
  const {
    values: { drops: tempDropIds },
  } = event;

  const { drops } = existingState.stageValues as TrackResourceStageValues;

  const dropsToKeep = drops.filter((drop) => tempDropIds.includes(drop.tempId));

  const inventory = addItemsToInventory(existingState, dropsToKeep);
  const trackingText = await defineStageTypeText(existingState.locationId);

  console.debug('UPDATING STAGEVALUES TO TRACK');
  await characterStateStore.update(existingState.id, {
    stageType: stageTypes.TRACK,
    stageValues: { trackingText },
    inventory: JSON.stringify(inventory),
  });
  setTimeout(
    () => characterTracks({ socket, characterId: existingState.characterId }),
    config.game.timeBetweenTracks,
  );
};

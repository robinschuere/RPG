import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { addItemsToInventory } from '../helpers/inventoryHelper';
import { CombatWinDropStageValues } from '../../../shared/types/CharacterState';
import { defineStageTypeText } from '../helpers/combatHelper';

const characterStateEntities = getEntity('character_states');

export const characterAcceptsFind = async ({
  existingState,
  event,
}: EventHandlerProps) => {
  if (!existingState || existingState.stageType === stageTypes.TRACK_RESOURCE) {
    return;
  }
  const {
    values: { drops: tempDropIds },
  } = event;
  const { drops } = existingState.stageValues as CombatWinDropStageValues;
  const dropsToKeep = drops.filter((drop) => tempDropIds.includes(drop.tempId));

  const inventory = addItemsToInventory(existingState, dropsToKeep);
  const trackingText = await defineStageTypeText(existingState.locationId);
  console.debug('UPDATING STAGETYPE TO TRACK');
  await characterStateEntities.update(existingState.id, {
    stageType: stageTypes.TRACK,
    stageValues: {
      trackingText,
    },
    inventory: JSON.stringify(inventory),
  });
};

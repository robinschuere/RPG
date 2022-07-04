import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';

const characterStateStore = getEntity('character_states');

export const characterFled = async ({ existingState }: EventHandlerProps) => {
  if (!existingState || existingState.stageType !== stageTypes.COMBAT_FLEE) {
    return;
  }

  console.debug('UPDATING STAGEVALUES');
  await characterStateStore.update(existingState.id, {
    stageType: stageTypes.IDLE,
    stageValues: {},
  });
};

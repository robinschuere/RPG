import { getEntity } from '../helpers/entityHelper';
import { roundTypes, stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { fleeSequence } from '../helpers/combatHelper';
import { CombatStageValues } from '../../../shared/types/CharacterState';
import { setRoundBusy } from './helpers/setRoundBusy';

const characterStateStore = getEntity('character_states');

export const characterFleesFromAction = async ({
  existingState,
}: EventHandlerProps) => {
  const existingStageValues = existingState.stageValues as CombatStageValues;
  if (
    !existingState ||
    existingState.stageType !== stageTypes.COMBAT ||
    existingStageValues.round !== roundTypes.CHARACTER ||
    existingStageValues.roundBusy
  ) {
    return;
  }
  const state = await setRoundBusy(existingState);

  console.debug('UPDATING STAGEVALUES');
  const updateState = fleeSequence(state);
  await characterStateStore.update(state.id, updateState);
};

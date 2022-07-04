import { getEntity } from '../../helpers/entityHelper';
import {
  CharacterState,
  CombatStageValues,
} from '../../../../shared/types/CharacterState';

const characterStateStore = getEntity('character_states');

export const setRoundBusy = async (existingState: CharacterState) => {
  const existingStageValues = existingState.stageValues as CombatStageValues;
  const stageValues: CombatStageValues = {
    ...existingStageValues,
    roundBusy: true,
  };
  const [newState] = await characterStateStore.update(existingState.id, {
    stageValues,
  });
  return newState;
};

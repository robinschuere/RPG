import { getEntity } from '../helpers/entityHelper';
import { roundTypes, stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { fightSequence } from '../helpers/combatHelper';
import { monsterAttack } from './helpers/monsterAttack';
import config from '../../config';
import {
  CharacterState,
  CombatStageValues,
} from '../../../shared/types/CharacterState';
import { characterDied } from './helpers/characterDied';
import { monsterDied } from './helpers/monsterDied';
import { setRoundBusy } from './helpers/setRoundBusy';

const characterStateStore = getEntity('character_states');

export const characterDoesFightingAction = async ({
  existingState,
  event,
  socket,
}: EventHandlerProps) => {
  const existingStageValues = existingState.stageValues as CombatStageValues;
  if (
    !existingState ||
    existingState.stageType !== stageTypes.COMBAT ||
    existingStageValues.round !== roundTypes.CHARACTER ||
    existingStageValues.roundBusy ||
    existingStageValues.autoAttack
  ) {
    return;
  }
  const state = await setRoundBusy(existingState);

  console.debug('UPDATING STAGEVALUES');
  const updateState = fightSequence(
    state,
    event.values ? event.values.autoAttack : undefined,
  );
  const [newState]: [CharacterState] = await characterStateStore.update(
    state.id,
    updateState,
  );
  if (newState.stageType === stageTypes.COMBAT) {
    const stageValues = newState.stageValues as CombatStageValues;
    if (stageValues.characterCombatState.HP === 0) {
      setTimeout(
        () => characterDied({ socket, characterId: newState.characterId }),
        config.game.timeBetweenRounds,
      );
      return;
    }
    if (stageValues.monsterCombatState.HP === 0) {
      setTimeout(
        () => monsterDied({ socket, characterId: newState.characterId }),
        config.game.timeBetweenRounds,
      );
      return;
    }
    setTimeout(
      () => monsterAttack({ socket, characterId: newState.characterId }),
      config.game.timeBetweenRounds,
    );
  }
};

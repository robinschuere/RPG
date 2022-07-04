import config from '../../../config';
import { stageTypes } from '../../../../shared/constants';
import { CombatStageValues } from '../../../../shared/types/CharacterState';
import { fightSequence } from '../../helpers/combatHelper';
import { getEntity } from '../../helpers/entityHelper';
import sendCharacterStateThroughSocket from '../../helpers/sendMessage';
import { characterDied } from './characterDied';
import { monsterDied } from './monsterDied';
import { EventHelperProps } from './types';

const characterStateStore = getEntity('character_states');

export const monsterAttack = async ({
  socket,
  characterId,
}: EventHelperProps): Promise<void> => {
  const characterState = await characterStateStore
    .getTable()
    .where({ characterId })
    .first()
    .select();
  if (characterState.stageType !== stageTypes.COMBAT) {
    return;
  }
  const updatedState = fightSequence(characterState);

  const [newState] = await characterStateStore.update(
    characterState.id,
    updatedState,
  );
  await sendCharacterStateThroughSocket(socket, true, characterId);

  const stageValues = newState.stageValues as CombatStageValues;

  if (stageValues.characterCombatState.HP === 0) {
    setTimeout(
      () => characterDied({ socket, characterId: characterId }),
      config.game.timeBetweenRounds,
    );
    return;
  }
  if (stageValues.monsterCombatState.HP === 0) {
    setTimeout(
      () => monsterDied({ socket, characterId: characterId }),
      config.game.timeBetweenRounds,
    );
    return;
  }
  if (stageValues.autoAttack) {
    setTimeout(
      () => monsterAttack({ socket, characterId: characterId }),
      config.game.timeBetweenRounds,
    );
  }
};

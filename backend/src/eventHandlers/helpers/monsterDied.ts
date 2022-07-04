import { stageTypes } from '../../../../shared/constants';
import { monsterDeathSequence } from '../../helpers/combatHelper';
import { getEntity } from '../../helpers/entityHelper';
import sendCharacterStateThroughSocket from '../../helpers/sendMessage';
import { EventHelperProps } from './types';

const characterStateStore = getEntity('character_states');

export const monsterDied = async ({
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
  const updatedState = monsterDeathSequence(characterState);

  await characterStateStore.update(characterState.id, updatedState);

  await sendCharacterStateThroughSocket(socket, true, characterId);
  return;
};

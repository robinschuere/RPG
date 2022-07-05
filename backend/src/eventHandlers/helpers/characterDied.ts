import { stageTypes } from '../../../../shared/constants';
import { characterDeathSequence } from '../../helpers/combatHelper';
import { getEntity } from '../../helpers/entityHelper';
import sendCharacterStateThroughSocket from '../../helpers/sendMessage';
import { EventHelperProps } from './types';

const characterStateStore = getEntity('character_states');

export const characterDied = async ({
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
  const updatedState = characterDeathSequence(characterState);

  await characterStateStore.update(characterState.id, updatedState);

  await sendCharacterStateThroughSocket(socket, true, characterId);
  return;
};

import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { Character } from '../../../shared/types/Character';
import { defineCharacterStatistics } from '../helpers/combatHelper';

const characterStore = getEntity('characters');
const characterStateStore = getEntity('character_states');

export const characterRaisesStats = async ({
  existingState,
  event,
}: EventHandlerProps) => {
  // you can only raise your stats in the IDLE state
  if (!existingState || existingState.stageType !== stageTypes.IDLE) {
    return;
  }
  const character = (await characterStore.getById(
    existingState.characterId,
  )) as Character;

  let totalRaisedPoints = 0;
  Object.values(event.values.points).forEach(
    (value: number) => (totalRaisedPoints += value),
  );
  if (character.points === 0 || totalRaisedPoints > character.points) {
    return;
  }
  const toUpdate = {};
  Object.entries(event.values.points)
    .filter((s) => s[1] > 0)
    .forEach((s) => {
      toUpdate[s[0]] = character[s[0]] + s[1];
    });
  const state = {
    ...toUpdate,
    points: character.points - totalRaisedPoints,
  };
  await characterStore.update(character.id, state);
  const characterCombatState = await defineCharacterStatistics(
    existingState,
    true,
  );
  await characterStateStore.update(existingState.id, {
    characterCombatState,
  });
};

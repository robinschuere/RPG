import { getEntity } from '../helpers/entityHelper';
import { stageTypes } from '../../../shared/constants';
import { EventHandlerProps } from './types';
import { getDrops } from '../helpers/combatHelper';
import { Character } from '../../../shared/types/Character';
import {
  definePoints,
  raiseCharacterExperience,
} from '../helpers/raiseHelpers';
import {
  CombatStageValues,
  CombatWinDropStageValues,
} from '../../../shared/types/CharacterState';

const characterStateStore = getEntity('character_states');
const characterStore = getEntity('characters');
const professionStore = getEntity('professions');
const raceStore = getEntity('races');

export const characterWins = async ({ existingState }: EventHandlerProps) => {
  if (!existingState || existingState.stageType !== stageTypes.COMBAT_WIN) {
    return;
  }
  const existingStageValues = existingState.stageValues as CombatStageValues;

  console.debug('UPDATING STAGEVALUES');
  const drops = await getDrops(existingState);
  const character: Character = await characterStore.getById(
    existingState.characterId,
  );
  const [level, experience] = raiseCharacterExperience(
    character.level,
    character.experience + existingStageValues.monsterCombatState.experience,
  );

  const race = await raceStore.getById(character.raceId);
  const professions = await Promise.all(
    character.professionIds.map((professionId) =>
      professionStore.getById(professionId),
    ),
  );

  await characterStore.update(character.id, {
    level,
    totalExperience:
      character.totalExperience +
      existingStageValues.monsterCombatState.experience,
    experience,
    points: definePoints(character, level, professions, race),
  });

  const stageValues: CombatWinDropStageValues = {
    drops,
    newLevel: level,
    oldLevel: character.level,
    monsterCombatState: existingStageValues.monsterCombatState,
  };

  await characterStateStore.update(existingState.id, {
    stageType: stageTypes.COMBAT_WIN_DROP,
    stageValues,
  });
};

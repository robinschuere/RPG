import config from '../../config';
import { Character } from '../../../shared/types/Character';
import { Race } from '../../../shared/types/Race';
import { Profession } from '../../../shared/types/Profession';

export const defineNextLevelExperience = (level: number) => {
  return Math.floor(level + 300 * (level / 9));
};

export const raiseCharacterExperience = (
  currentLevel: number,
  currentExperience: number,
) => {
  const nextLevelExp = defineNextLevelExperience(currentLevel);
  if (currentExperience >= nextLevelExp) {
    return raiseCharacterExperience(
      currentLevel + 1,
      currentExperience - nextLevelExp,
    );
  }
  return [currentLevel, currentExperience];
};

export const definePoints = (
  character: Character,
  newLevel: number,
  professions: Profession[],
  race: Race,
): number => {
  let totalPoints = config.game.levelRaise + race.extraRaise;

  professions.forEach(
    (profession) => (totalPoints += profession.extraRaise || 0),
  );

  const levelDifference = newLevel - character.level;
  return character.points + levelDifference * totalPoints;
};

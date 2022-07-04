import config from '../../config';
import { ClassTrait } from './types';
import {
  createChanceCounter,
  randomizer,
} from '../../../shared/helpers/randomizer';
import { Monster } from '../../../shared/types/Monster';

const pointsToShare = (level = 1) =>
  config.game.levelStart + level * config.game.levelRaise;

const getTraitValues = (values: ClassTrait[]) => (name) => {
  const amount = values.filter((f) => f === name).length || 0;
  return amount;
};

export const createClassMonster = (
  id: number,
  level: number,
  professionId: number,
  name: string,
  traits: ClassTrait[],
  raceId: number,
  description: string,
): Monster => {
  const points = pointsToShare(level);
  const genderChance = createChanceCounter([
    { id: 1, chance: 50 },
    { id: 2, chance: 50 },
  ]);
  const traitChance = createChanceCounter(
    traits.map(({ trait, chance }) => ({ id: trait, chance: chance })),
  );
  const traitValues = [];
  const traitRandom = randomizer(traitChance);
  const genderRandom = randomizer(genderChance);
  for (let index = 0; index < points; index++) {
    const r = traitRandom();
    traitValues.push(traitChance[r]);
  }
  const get = getTraitValues(traitValues);
  return {
    id,
    name: name || 'placeholder',
    description,
    raceId,
    professionId,
    genderId: genderChance[genderRandom()],
    level,
    health: get('health'),
    strength: get('strength'),
    defence: get('defence'),
    wisdom: get('wisdom'),
    dexterity: get('dexterity'),
    intelligence: get('intelligence'),
    accuracy: get('accuracy'),
    speed: get('speed'),
    luck: get('luck'),
    experience: Math.floor(level * 1.85 * 5),
  };
};

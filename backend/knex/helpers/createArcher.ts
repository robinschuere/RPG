import { createClassMonster } from './createClassMonster';
import { CreateMonster, ClassTrait } from './types';

export const createArcher = (monsterProps: CreateMonster) => {
  const { level = 1, id = 1, name, raceId, description = '' } = monsterProps;
  const archerTraits: ClassTrait[] = [
    { trait: 'health', chance: 20 },
    { trait: 'strength', chance: 25 },
    { trait: 'defence', chance: 5 },
    { trait: 'wisdom', chance: 5 },
    { trait: 'dexterity', chance: 5 },
    { trait: 'intelligence', chance: 5 },
    { trait: 'accuracy', chance: 15 },
    { trait: 'speed', chance: 15 },
    { trait: 'luck', chance: 5 },
  ];

  return createClassMonster(
    id,
    level,
    4,
    name,
    archerTraits,
    raceId,
    description,
  );
};

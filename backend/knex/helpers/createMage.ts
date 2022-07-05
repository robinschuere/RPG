import { createClassMonster } from './createClassMonster';
import { CreateMonster, ClassTrait } from './types';

export const createMage = (monsterProps: CreateMonster) => {
  const { level = 1, id = 1, name, raceId, description = '' } = monsterProps;
  const mageTraits: ClassTrait[] = [
    { trait: 'health', chance: 20 },
    { trait: 'strength', chance: 5 },
    { trait: 'defence', chance: 5 },
    { trait: 'wisdom', chance: 20 },
    { trait: 'dexterity', chance: 5 },
    { trait: 'intelligence', chance: 20 },
    { trait: 'accuracy', chance: 15 },
    { trait: 'speed', chance: 5 },
    { trait: 'luck', chance: 5 },
  ];

  return createClassMonster(
    id,
    level,
    1,
    name,
    mageTraits,
    raceId,
    description,
  );
};

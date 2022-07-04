import {
  combatTypes,
  locationTypes,
  offenceTypes,
  roundTypes,
  slotTypes,
  stageTypes,
} from '../../../shared/constants';
import { getRandomValueFromEntities } from '../../../shared/helpers/randomizer';
import { Character } from '../../../shared/types/Character';
import { LocationMonsterDrop } from '../../../shared/types/LocationMonsterDrop';
import {
  CharacterState,
  CombatStageValues,
  CombatStatistics,
  RoundValue,
  StatisticValues,
  TrackCombatStageValues,
} from '../../../shared/types/CharacterState';
import { Item } from '../../../shared/types/Item';
import { LocationMonsterItem } from '../../../shared/types/LocationMonsterItem';
import { Monster } from '../../../shared/types/Monster';
import { Race } from '../../../shared/types/Race';
import { getEntity } from './entityHelper';
import { v4 as uuid } from 'uuid';
import { Location } from '../../../shared/types/Location';
import { Gender } from '../../../shared/types/Gender';

const locationStore = getEntity('locations');
const itemStore = getEntity('items');
const raceStore = getEntity('races');
const genderStore = getEntity('genders');
const characterStore = getEntity('characters');
const monsterStore = getEntity('monsters');
const locationMonsterItemStore = getEntity('location_monster_items');
const locationMonsterDropStore = getEntity('location_monster_drops');

export const getMaxHealth = (characterValues: StatisticValues): number => {
  return (
    characterValues.HEA * 5 + characterValues.WIS * 2 + characterValues.DEF * 2
  );
};

export const getMaxMana = (characterValues: StatisticValues): number => {
  return characterValues.INT * 8;
};

const defineStatistics = (
  entity: Character | Monster,
  items: Item[],
): StatisticValues => {
  const values: StatisticValues = {
    HEA: entity.health || 0,
    STR: entity.strength || 0,
    DEF: entity.defence || 0,
    WIS: entity.wisdom || 0,
    DEX: entity.dexterity || 0,
    INT: entity.intelligence || 0,
    ACC: entity.accuracy || 0,
    SPD: entity.speed || 0,
    LUC: entity.luck || 0,
  };

  items.forEach((item) => {
    values.HEA += item?.traits['health'] ? item.traits['health'] : 0;
    values.STR += item?.traits['strength'] ? item.traits['strength'] : 0;
    values.DEF += item?.traits['defence'] ? item.traits['defence'] : 0;
    values.WIS += item?.traits['wisdom'] ? item.traits['wisdom'] : 0;
    values.DEX += item?.traits['dexterity'] ? item.traits['dexterity'] : 0;
    values.INT += item?.traits['intelligence']
      ? item.traits['intelligence']
      : 0;
    values.ACC += item?.traits['accuracy'] ? item.traits['accuracy'] : 0;
    values.SPD += item?.traits['speed'] ? item.traits['speed'] : 0;
    values.LUC += item?.traits['luck'] ? item.traits['luck'] : 0;
  });
  return values;
};

const getCombatStatistics = (
  statistics: StatisticValues,
  name: string,
  race: Race,
  gender: Gender,
  experience: number,
  weapon?: Item,
): CombatStatistics => {
  const defaultOffenceType: string =
    statistics.INT > statistics.STR
      ? offenceTypes.ARCANE
      : offenceTypes.PHYSICAL;

  const combatStatistics: CombatStatistics = {
    name,
    race,
    gender,
    HP: getMaxHealth(statistics),
    MAXHP: getMaxHealth(statistics),
    MANA: getMaxMana(statistics),
    MAXMANA: getMaxMana(statistics),
    offenceType: weapon?.offenceType || defaultOffenceType,
    arcaneOffence: statistics.INT,
    arcaneDefence: statistics.WIS,
    physicalOffence: statistics.STR,
    physicalDefence: statistics.DEF,
    dodgeChance: statistics.DEX,
    blockChance: statistics.DEF,
    accuracy: statistics.ACC,
    speed: statistics.SPD,
    experience,
  };

  return combatStatistics;
};

export const defineCharacterStatistics = async (
  characterState: CharacterState,
  resetDueToRaisedStats?: boolean,
): Promise<CombatStatistics> => {
  if (
    !resetDueToRaisedStats &&
    characterState.characterCombatState &&
    characterState.characterCombatState.name
  ) {
    // return the values that are present now.
    return characterState.characterCombatState;
  }

  const character = (await characterStore.getById(
    characterState.characterId,
  )) as Character;
  const characterRace: Race = await raceStore.getById(character.raceId);
  const characterGender: Gender = await genderStore.getById(character.genderId);

  const wornItems = [];
  Object.keys(slotTypes).forEach((key) => {
    const gearItemForSlot = characterState.gear.find((s) => s.slot === key);
    if (gearItemForSlot) {
      wornItems.push(gearItemForSlot.itemId);
    }
  });
  const items: Item[] = await Promise.all(wornItems.map(itemStore.getById));

  const characterStatistics = defineStatistics(character, items);

  const weaponId: number = characterState.gear[slotTypes.WEAPON_HAND];
  const weapon = items.find((item: Item) => item.id === weaponId);

  const statistics: CombatStatistics = getCombatStatistics(
    characterStatistics,
    character.name,
    characterRace,
    characterGender,
    character.experience,
    weapon,
  );

  return statistics;
};

export const defineMonsterStatistics = async (
  characterState: CharacterState,
): Promise<CombatStatistics> => {
  const {
    monster: { id },
    locationMonster,
  } = characterState.stageValues as TrackCombatStageValues;
  // always get the latest version of the monster ...
  const monster: Monster = await monsterStore.getById(id);
  const monsterRace: Race = await raceStore.getById(monster.raceId);
  const monsterGender: Gender = await genderStore.getById(monster.genderId);
  const locationMonsterItems: LocationMonsterItem[] =
    await locationMonsterItemStore
      .getTable()
      .where({
        locationMonsterId: locationMonster.id,
      })
      .select();

  const items = await Promise.all(
    locationMonsterItems.map((monsterItem) =>
      itemStore.getById(monsterItem.itemId),
    ),
  );

  const monsterStatistics = defineStatistics(monster, items);

  const locationMonsterItem = locationMonsterItems.find(
    (s) => s.slot === slotTypes.WEAPON_HAND,
  );
  const weapon = locationMonsterItem
    ? items.find((item: Item) => item.id === locationMonsterItem.itemId)
    : undefined;

  const statistics = getCombatStatistics(
    monsterStatistics,
    monster.name,
    monsterRace,
    monsterGender,
    monster.experience,
    weapon,
  );

  return statistics;
};

export const defineRound = (
  characterCombatState: CombatStatistics,
  monsterCombatState: CombatStatistics,
): string => {
  if (characterCombatState.speed === monsterCombatState.speed) {
    const randomizer = Math.floor(Math.random() * 100);
    return randomizer <= 50 ? roundTypes.CHARACTER : roundTypes.MONSTER;
  }
  return characterCombatState.speed > monsterCombatState.speed
    ? roundTypes.CHARACTER
    : roundTypes.MONSTER;
};

const dodged = (statistics: CombatStatistics): boolean => {
  // dodgeChance is maxed at 30%;
  const randomizer = Math.floor(Math.random() * 100);
  const chance = 100 - Math.floor(statistics.dodgeChance / 10) > 70;
  const dodgeChance = chance ? 100 - statistics.dodgeChance : 70;
  return randomizer >= dodgeChance;
};

const deflected = (statistics: CombatStatistics): boolean => {
  const randomizer = Math.floor(Math.random() * 100);
  return randomizer <= statistics.blockChance;
};

const hit = (statistics: CombatStatistics): boolean => {
  const randomizer = Math.floor(Math.random() * 100);
  if (statistics.accuracy < 50) {
    return randomizer >= 50;
  } else {
    return randomizer >= 100 - statistics.accuracy;
  }
};

const physicalHit = (
  attacker: CombatStatistics,
  defender: CombatStatistics,
): RoundValue => {
  if (dodged(defender))
    return { type: combatTypes.DODGED, amount: 0, deflection: 0 };
  if (hit(attacker)) {
    const attValue = Math.floor(Math.random() * attacker.physicalOffence * 0.8);
    const defValue = Math.floor(Math.random() * defender.physicalDefence * 0.5);
    const hitValue = attValue - defValue;
    if (hitValue < 0)
      return { type: combatTypes.RETALIATED, amount: 0, deflection: -hitValue };
    else {
      if (deflected(defender)) {
        return {
          type: combatTypes.DEFLECTED,
          amount: hitValue,
          deflection: Math.floor(hitValue * 0.15),
        };
      }
      return { type: combatTypes.HIT, amount: hitValue, deflection: 0 };
    }
  }
  return { type: combatTypes.MISSED, amount: 0, deflection: 0 };
};

const arcaneHit = (
  attacker: CombatStatistics,
  defender: CombatStatistics,
): RoundValue => {
  if (dodged(defender))
    return { type: combatTypes.DODGED, amount: 0, deflection: 0 };
  if (hit(attacker)) {
    const attValue = Math.floor(Math.random() * (attacker.arcaneOffence * 0.8));
    const defValue = Math.floor(Math.random() * (defender.arcaneDefence * 0.5));
    const hitValue = attValue - defValue;
    if (hitValue < 0)
      return { type: combatTypes.RETALIATED, amount: 0, deflection: -hitValue };
    else {
      if (deflected(defender)) {
        return {
          type: combatTypes.DEFLECTED,
          amount: hitValue,
          deflection: Math.floor(hitValue * 0.15),
        };
      }
      return { type: combatTypes.HIT, amount: hitValue, deflection: 0 };
    }
  }
  return { type: combatTypes.MISSED, amount: 0, deflection: 0 };
};

const avoid = (attacker: CombatStatistics): RoundValue => {
  const randomizer = Math.floor(Math.random() * 100);
  const avoided = randomizer >= 100 - attacker.dodgeChance;
  if (avoided) {
    return { type: combatTypes.FLEE, amount: 0, deflection: 0 };
  }

  return {
    type: combatTypes.FLEE_FAIL,
    amount: 0,
    deflection: Math.floor(attacker.MAXHP * 0.1),
  };
};

const monsterDied = (): RoundValue => {
  return {
    type: combatTypes.MONSTERDIED,
    amount: 0,
    deflection: 0,
  };
};

const characterDied = (): RoundValue => {
  return {
    type: combatTypes.CHARACTERDIED,
    amount: 0,
    deflection: 0,
  };
};

export const getDamage = (
  attacker: CombatStatistics,
  defender: CombatStatistics,
) => {
  const damage =
    attacker.offenceType === offenceTypes.PHYSICAL
      ? physicalHit(attacker, defender)
      : arcaneHit(attacker, defender);

  return damage;
};

const switchRounds = (
  round: string,
  characterCombatState: CombatStatistics,
  monsterCombatState: CombatStatistics,
): string => {
  if (characterCombatState.HP === 0 || monsterCombatState.HP === 0) {
    return roundTypes.MONSTER;
  }
  return round === roundTypes.CHARACTER
    ? roundTypes.MONSTER
    : roundTypes.CHARACTER;
};

const defineRoundText = (
  round: string,
  attacker: CombatStatistics,
  defender: CombatStatistics,
  roundValue: RoundValue,
): string => {
  switch (roundValue.type) {
    case combatTypes.DODGED:
      return round === roundTypes.CHARACTER
        ? `You attack the ${defender.name} but it dodges you.`
        : `The ${attacker.name} attacks you, but you manage to dodge the attack.`;
    case combatTypes.MISSED:
      return round === roundTypes.CHARACTER
        ? `You attack but miss the ${defender.name}.`
        : `The ${attacker.name} attacks but misses you.`;
    case combatTypes.HIT:
      return round === roundTypes.CHARACTER
        ? `You manage to land a hit on the ${defender.name} for ${roundValue.amount} HP.`
        : `The ${attacker.name} damages you for ${roundValue.amount} HP.`;
    case combatTypes.DEFLECTED:
      return round === roundTypes.CHARACTER
        ? `You manage to land a hit on the ${defender.name} for ${roundValue.amount} HP, somehow it deflects ${roundValue.deflection} HP.`
        : `The ${attacker.name} hits you for ${roundValue.amount} HP. You manage to deflect ${roundValue.deflection} HP.`;
    case combatTypes.RETALIATED:
      return round === roundTypes.CHARACTER
        ? `You stumble during your attack. The ${defender.name} sees a chance to hit you for ${roundValue.deflection} HP.`
        : `The ${attacker.name} stumbles. You use the chance and hit ${roundValue.deflection} HP.`;
    case combatTypes.FLEE:
      return `Instead of attacking, you turn yourself around and start running. You succesful run away from the battle.`;
    case combatTypes.FLEE_FAIL:
      return `While trying to run away, the ${defender.name} hits you on the back for ${roundValue.deflection} HP`;
    case combatTypes.CHARACTERDIED:
      return 'Oh dear ... You are dead!';
    case combatTypes.MONSTERDIED:
      return round === roundTypes.CHARACTER
        ? `Congratulations! You defeated ${defender.name}`
        : `Congratulations! You defeated ${attacker.name}`;
    default:
      throw new Error(
        `This combatType has no defined text yet. This is not correct for ${roundValue.type}`,
      );
  }
};

const defineNewCombatState = (
  attacker: CombatStatistics,
  defender: CombatStatistics,
  roundValue: RoundValue,
): [CombatStatistics, CombatStatistics] => {
  let attackerHP: number = attacker.HP;
  let defenderHP: number = defender.HP;
  switch (roundValue.type) {
    case combatTypes.HIT:
      defenderHP -= roundValue.amount;
      return [attacker, { ...defender, HP: defenderHP < 0 ? 0 : defenderHP }];
    case combatTypes.DEFLECTED:
      attackerHP -= roundValue.deflection;
      defenderHP -= roundValue.amount;
      return [
        { ...attacker, HP: attackerHP < 0 ? 0 : attackerHP },
        { ...defender, HP: defenderHP < 0 ? 0 : defenderHP },
      ];
    case combatTypes.RETALIATED:
      attackerHP -= roundValue.deflection;
      return [{ ...attacker, HP: attackerHP < 0 ? 0 : attackerHP }, defender];
    default:
      return [attacker, defender];
  }
};

interface FightReturn {
  stageValues: CombatStageValues;
  stageType: string;
  characterCombatState: CombatStatistics;
}

const sequence = (
  characterState: CharacterState,
  action: (
    attacker: CombatStatistics,
    defender?: CombatStatistics,
  ) => RoundValue,
  toggleAutoAttack?: boolean,
): FightReturn => {
  const {
    characterCombatState,
    monsterCombatState,
    round,
    roundHistory,
    locationMonster,
    autoAttack,
  } = characterState.stageValues as CombatStageValues;
  const attacker =
    round === roundTypes.CHARACTER ? characterCombatState : monsterCombatState;
  const defender =
    round === roundTypes.MONSTER ? characterCombatState : monsterCombatState;

  const roundValue = action(attacker, defender);

  const [updatedAttacker, updatedDefender] = defineNewCombatState(
    attacker,
    defender,
    roundValue,
  );

  const newCharacterCombatState =
    round === roundTypes.CHARACTER ? updatedAttacker : updatedDefender;
  const newMonsterCombatState =
    round === roundTypes.MONSTER ? updatedAttacker : updatedDefender;

  const stageValues: CombatStageValues = {
    round: switchRounds(round, newCharacterCombatState, monsterCombatState),
    roundValue,
    roundHistory: [
      {
        roundValue,
        roundText: defineRoundText(round, attacker, defender, roundValue),
      },
      ...roundHistory,
    ],
    characterCombatState: newCharacterCombatState,
    monsterCombatState: newMonsterCombatState,
    roundBusy: false,
    locationMonster,
    autoAttack: toggleAutoAttack ? !autoAttack : autoAttack,
  };

  if (roundValue.type === combatTypes.FLEE) {
    return {
      stageValues,
      characterCombatState: newCharacterCombatState,
      stageType: stageTypes.COMBAT_FLEE,
    };
  }

  if (roundValue.type === combatTypes.CHARACTERDIED) {
    return {
      stageValues,
      characterCombatState: newCharacterCombatState,
      stageType: stageTypes.COMBAT_DEATH,
    };
  }

  if (roundValue.type === combatTypes.MONSTERDIED) {
    return {
      stageValues,
      characterCombatState: newCharacterCombatState,
      stageType: stageTypes.COMBAT_WIN,
    };
  }

  return {
    stageValues,
    characterCombatState: newCharacterCombatState,
    stageType: stageTypes.COMBAT,
  };
};

export const fightSequence = (
  characterState: CharacterState,
  toggleAutoAttack?: boolean,
): FightReturn => {
  return sequence(characterState, getDamage, toggleAutoAttack || false);
};

export const characterDeathSequence = (
  characterState: CharacterState,
): FightReturn => {
  return sequence(characterState, characterDied);
};

export const monsterDeathSequence = (
  characterState: CharacterState,
): FightReturn => {
  return sequence(characterState, monsterDied);
};

export const fleeSequence = (characterState: CharacterState): FightReturn => {
  return sequence(characterState, avoid);
};

export const getDrops = async (
  characterState: CharacterState,
): Promise<any[]> => {
  const { locationMonster } = characterState.stageValues as CombatStageValues;
  const locationMonsterDrops = await locationMonsterDropStore
    .getTable()
    .where({ locationMonsterId: locationMonster.id })
    .select();

  if (locationMonsterDrops.length === 0) {
    return [];
  }

  const rolls = Array.from(Array(locationMonster.dropRolls).keys());
  const drops = await Promise.all(
    rolls.map(async () => {
      const randomLocationMonsterDrop: LocationMonsterDrop =
        getRandomValueFromEntities(locationMonsterDrops);
      const item: Item = await itemStore.getById(
        randomLocationMonsterDrop.itemId,
      );
      return {
        tempId: uuid(),
        item,
        amount: randomLocationMonsterDrop.amount,
      };
    }),
  );
  return drops.filter(Boolean);
};

export const defineStageTypeText = async (
  locationId: number,
): Promise<string> => {
  const location = (await locationStore.getById(locationId)) as Location;
  switch (location.locationType) {
    case locationTypes.TRAINING_GROUNDS:
      return 'You start searching for a good opponent.';
    case locationTypes.WOODS:
      return 'You venture into the woods, searching for tracks.';
    default:
      return 'You start tracking';
  }
};

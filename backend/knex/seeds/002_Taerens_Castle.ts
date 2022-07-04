import { Knex } from 'knex';
import { offenceTypes, slotTypes } from '../../../shared/constants';
import { LocationMonsterDrop } from '../../../shared/types/LocationMonsterDrop';
import { createArcher } from '../helpers/createArcher';
import { createMage } from '../helpers/createMage';
import { createWarrior } from '../helpers/createWarrior';

const populateLocations = async (knex: Knex): Promise<void> => {
  const locations = [
    { id: 1, locationType: 'CASTLE', name: 'Taerens Castle', regionId: 1 },
    {
      id: 2,
      locationType: 'CASTLE_GATE',
      name: 'Taerens Castle Southern Gates',
      regionId: 1,
    },
    {
      id: 3,
      locationType: 'TRAINING_GROUNDS',
      name: 'Taerens Castle Southern training grounds',
      regionId: 1,
    },
    {
      id: 4,
      locationType: 'TRAINING_GROUNDS',
      name: 'Taerens Castle Eastern training grounds',
      regionId: 1,
    },
    {
      id: 5,
      locationType: 'TRAINING_GROUNDS',
      name: 'Taerens Castle Western training grounds',
      regionId: 1,
    },
    {
      id: 6,
      locationType: 'TRAINING_GROUNDS',
      name: 'Taerens Castle Northern training grounds',
      regionId: 1,
    },
    {
      id: 7,
      locationType: 'CASTLE_GATE',
      name: 'Taerens Castle Northern Gates',
      regionId: 1,
    },
    {
      id: 8,
      locationType: 'CASTLE_YARD',
      name: 'Taerens Castle inner grounds',
      regionId: 1,
    },
    {
      id: 9,
      locationType: 'CASTLE_HALL',
      name: 'Taerens Castle The Keep',
      regionId: 1,
    },
    { id: 10, locationType: 'ROOM', name: 'Taerens Castle Mess', regionId: 1 },
    {
      id: 11,
      locationType: 'ROOM',
      name: 'Taerens Castle Kitchen',
      regionId: 1,
    },
    {
      id: 12,
      locationType: 'ROOM',
      name: 'Taerens Castle Library',
      regionId: 1,
    },
    {
      id: 13,
      locationType: 'ROOM',
      name: 'Taerens Castle Lord Aëren Room',
      regionId: 1,
    },
  ];
  return knex.batchInsert('locations', locations);
};

const populateLocationDirections = async (knex: Knex): Promise<void> => {
  const locationDirections = [
    { id: 1, currentLocationId: 1, direction: 'NORTH', directionLocationId: 2 },
    { id: 2, currentLocationId: 2, direction: 'NORTH', directionLocationId: 3 },
    { id: 3, currentLocationId: 3, direction: 'NORTH', directionLocationId: 8 },
    { id: 4, currentLocationId: 8, direction: 'NORTH', directionLocationId: 9 },
    { id: 5, currentLocationId: 9, direction: 'WEST', directionLocationId: 10 },
    { id: 6, currentLocationId: 9, direction: 'EAST', directionLocationId: 12 },
    {
      id: 7,
      currentLocationId: 10,
      direction: 'SOUTH',
      directionLocationId: 11,
    },
    {
      id: 8,
      currentLocationId: 12,
      direction: 'SOUTH',
      directionLocationId: 13,
    },
    {
      id: 9,
      currentLocationId: 3,
      direction: 'NORTHEAST',
      directionLocationId: 4,
    },
    {
      id: 10,
      currentLocationId: 3,
      direction: 'NORTHWEST',
      directionLocationId: 5,
    },
    {
      id: 11,
      currentLocationId: 4,
      direction: 'NORTHWEST',
      directionLocationId: 6,
    },
    {
      id: 12,
      currentLocationId: 5,
      direction: 'NORTHEAST',
      directionLocationId: 6,
    },
    {
      id: 13,
      currentLocationId: 6,
      direction: 'NORTH',
      directionLocationId: 7,
    },
  ];
  const invertDirection = (direction) => {
    switch (direction) {
      case 'NORTH':
        return 'SOUTH';
      case 'NORTHEAST':
        return 'SOUTHWEST';
      case 'EAST':
        return 'WEST';
      case 'SOUTHEAST':
        return 'NORTHWEST';
      case 'SOUTH':
        return 'NORTH';
      case 'SOUTHWEST':
        return 'NORTHEAST';
      case 'WEST':
        return 'EAST';
      case 'NORTHWEST':
        return 'SOUTHEAST';
      default:
        throw new Error('Wrong direction type');
    }
  };
  const lastValue = Math.max(...locationDirections.map((s) => s.id));
  const returnLocations = locationDirections.map((s, index) => ({
    id: lastValue + index + 1,
    currentLocationId: s.directionLocationId,
    directionLocationId: s.currentLocationId,
    direction: invertDirection(s.direction),
  }));
  return knex.batchInsert('location_directions', [
    ...locationDirections,
    ...returnLocations,
  ]);
};

const populateMonsters = async (knex: Knex): Promise<void> => {
  const raceId = 1;
  const southernWarriors = [
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
  ].map((name, index) =>
    createWarrior({ level: 1, id: index + 1, name, raceId }),
  );

  const easternWarriors = [
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
  ].map((name, index) =>
    createWarrior({ level: 3, id: index + 6, name, raceId }),
  );

  const westernWarriors = [
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
  ].map((name, index) =>
    createWarrior({ level: 6, id: index + 11, name, raceId }),
  );

  const northernWarriors = [
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
  ].map((name, index) =>
    createWarrior({ level: 12, id: index + 16, name, raceId }),
  );

  const northernArchers = [
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
    'Guard of Taeren',
  ].map((name, index) =>
    createArcher({ level: 12, id: index + 21, name, raceId }),
  );

  const monsters = [
    ...southernWarriors,
    ...easternWarriors,
    ...westernWarriors,
    ...northernWarriors,
    ...northernArchers,
    createWarrior({
      level: 18,
      id: 26,
      name: 'Tyraen',
      raceId,
      description: 'Head guard of Taeren',
    }),
    createWarrior({
      level: 18,
      id: 27,
      name: 'Tusk',
      raceId,
      description: 'Castle guard of Taeren',
    }),
    createWarrior({
      level: 18,
      id: 28,
      name: 'Dagger',
      raceId,
      description: 'Castle guard of Taeren',
    }),
    createArcher({
      level: 18,
      id: 29,
      name: 'Asmon',
      raceId,
      description: 'Castle guard of Taeren',
    }),
    createMage({
      level: 18,
      id: 30,
      name: 'Gam',
      raceId,
      description: 'Mage of Taeren',
    }),
  ];

  return knex.batchInsert('monsters', monsters);
};

const populateItems = (knex: Knex) => {
  const items = [
    {
      id: 10,
      name: 'Small iron sword',
      itemTypeId: 3,
      extras: '{}',
      traits: JSON.stringify({
        strength: 10,
        dexterity: 5,
      }),
      worth: 5,
      slots: [slotTypes.WEAPON_HAND],
      offenceType: offenceTypes.PHYSICAL,
    },
    {
      id: 11,
      name: 'Wooden shield',
      itemTypeId: 2,
      extras: '{}',
      traits: JSON.stringify({
        defence: 5,
      }),
      worth: 5,
      slots: [slotTypes.SHIELD_HAND],
    },
    {
      id: 12,
      name: 'Iron Chainmail',
      itemTypeId: 2,
      extras: '{}',
      traits: JSON.stringify({
        defence: 15,
        dexterity: 5,
      }),
      worth: 25,
      slots: [slotTypes.BODY],
    },
    {
      id: 13,
      name: 'Iron Helmet',
      itemTypeId: 2,
      extras: '{}',
      traits: JSON.stringify({
        defence: 10,
      }),
      worth: 10,
      slots: [slotTypes.HEAD],
    },
    {
      id: 14,
      name: 'Leather pants',
      itemTypeId: 2,
      extras: '{}',
      traits: JSON.stringify({
        defence: 10,
      }),
      worth: 10,
      slots: [slotTypes.PANTS],
    },
  ];
  return knex.batchInsert('items', items);
};

const populateLocationResources = async (knex: Knex): Promise<void> => {
  const resources = [];
  return knex.batchInsert('location_resources', resources);
};

const populateLocationMonsters = async (knex: Knex): Promise<void> => {
  const southernLocationsMonsters = [{ id: 3, monsters: [1, 2, 3, 4, 5] }];
  const easternLocationsMonsters = [{ id: 4, monsters: [6, 7, 8, 9, 10] }];
  const westernLocationsMonsters = [{ id: 5, monsters: [11, 12, 13, 14, 15] }];
  const northernLocationsMonsters = [
    { id: 6, monsters: [16, 17, 18, 19, 20, 21, 22, 23, 24, 25] },
  ];

  const LocationMonsters = [];
  let startingId = 0;

  const pushIntoLocationMonsters = (
    locationId,
    monsterId,
    chance,
    dropRolls = 1,
  ) => {
    startingId++;
    LocationMonsters.push({
      id: startingId,
      locationId,
      monsterId,
      chance,
      dropRolls,
    });
  };

  southernLocationsMonsters.forEach(({ id: locationId, monsters }) => {
    monsters.forEach((monsterId) => {
      pushIntoLocationMonsters(locationId, monsterId, 20);
    });
  });
  easternLocationsMonsters.forEach(({ id: locationId, monsters }) => {
    monsters.forEach((monsterId) => {
      pushIntoLocationMonsters(locationId, monsterId, 20);
    });
  });
  westernLocationsMonsters.forEach(({ id: locationId, monsters }) => {
    monsters.forEach((monsterId) => {
      pushIntoLocationMonsters(locationId, monsterId, 20);
    });
  });
  northernLocationsMonsters.forEach(({ id: locationId, monsters }) => {
    monsters.forEach((monsterId) => {
      pushIntoLocationMonsters(locationId, monsterId, 9);
    });
  });
  pushIntoLocationMonsters(6, 26, 2, 2);
  pushIntoLocationMonsters(6, 27, 2, 2);
  pushIntoLocationMonsters(6, 28, 2, 2);
  pushIntoLocationMonsters(6, 29, 2, 2);
  pushIntoLocationMonsters(6, 30, 2, 2);
  return knex.batchInsert('location_monsters', LocationMonsters);
};

const populateLocationShops = async (knex: Knex): Promise<void> => {
  const locationShops = [
    {
      id: 1,
      locationId: 8,
      name: 'The hoarder',
      sales: JSON.stringify({
        shopkeeper: 'Lars',
        items: [2],
        salePercentage: 1.2,
        buyPercentage: 0.5,
      }),
    },
  ];
  return knex.batchInsert('location_shops', locationShops);
};

const populateLocationMonsterItems = async (knex: Knex): Promise<void> => {
  const locationMonsterItems = [
    { id: 1, locationMonsterId: 1, itemId: 10, slot: slotTypes.WEAPON_HAND },
    { id: 2, locationMonsterId: 1, itemId: 12, slot: slotTypes.HEAD },
  ];

  return knex.batchInsert('location_monster_items', locationMonsterItems);
};

const populateLocationMonsterDrops = async (knex: Knex): Promise<void> => {
  const locationMonsterDrops: LocationMonsterDrop[] = [
    { id: 1, locationMonsterId: 1, itemId: 1, amount: 5, chance: 90 },
    { id: 2, locationMonsterId: 1, itemId: 2, amount: 1, chance: 10 },
    { id: 3, locationMonsterId: 2, itemId: 1, amount: 5, chance: 90 },
    { id: 4, locationMonsterId: 2, itemId: 2, amount: 1, chance: 10 },
    { id: 5, locationMonsterId: 3, itemId: 1, amount: 5, chance: 90 },
    { id: 6, locationMonsterId: 3, itemId: 2, amount: 1, chance: 10 },
    { id: 7, locationMonsterId: 4, itemId: 1, amount: 5, chance: 90 },
    { id: 8, locationMonsterId: 4, itemId: 2, amount: 1, chance: 10 },
    { id: 9, locationMonsterId: 5, itemId: 1, amount: 5, chance: 90 },
    { id: 10, locationMonsterId: 5, itemId: 2, amount: 1, chance: 10 },
  ];
  return knex.batchInsert('location_monster_drops', locationMonsterDrops);
};

export async function seed(knex: Knex): Promise<void> {
  await populateLocations(knex);
  await populateLocationShops(knex);
  await populateLocationDirections(knex);
  await populateMonsters(knex);
  await populateItems(knex);
  await populateLocationMonsters(knex);
  await populateLocationMonsterDrops(knex);
  await populateLocationMonsterItems(knex);
  await populateLocationResources(knex);
}

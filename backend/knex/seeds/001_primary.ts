import { Knex } from 'knex';

const dropper = async (knex) => {
  await knex('events').del();
  await knex('character_states').del();
  await knex('characters').del();
  await knex('users').del();
  await knex('location_resources').del();
  await knex('location_directions').del();
  await knex('location_shops').del();
  await knex('location_monster_drops').del();
  await knex('location_monster_items').del();
  await knex('location_monsters').del();
  await knex('monsters').del();
  await knex('locations').del();
  await knex('items').del();
  await knex('regions').del();
  await knex('roles').del();
  await knex('races').del();
  await knex('professions').del();
  await knex('genders').del();
  await knex('item_types').del();
};

const populateRaces = async (knex: Knex): Promise<void> => {
  const races: any[] = [
    { id: 1, name: 'Human', starter: true },
    { id: 2, name: 'Dwarf', starter: true },
    { id: 3, name: 'Elf', starter: true },
    { id: 4, name: 'Dauntir', starter: true },
    { id: 5, name: 'Goblin' },
    { id: 6, name: 'Arachnoid' },
    { id: 7, name: 'Wolf' },
    { id: 8, name: 'High Elf', extraRaise: 5 },
    { id: 9, name: 'High Human', extraRaise: 5 },
  ];
  return knex.batchInsert('races', races);
};

const populateRoles = async (knex: Knex): Promise<void> => {
  const roles = [
    { id: 1, name: 'User' },
    { id: 9001, name: 'Administrator' },
  ];
  return knex.batchInsert('roles', roles);
};

const populateItemTypes = async (knex: Knex): Promise<void> => {
  const itemTypes = [
    { id: 1, name: 'consumable' },
    { id: 2, name: 'gear' },
    { id: 3, name: 'weapon' },
    { id: 4, name: 'resource' },
    { id: 5, name: 'salvagable' },
  ];
  return knex.batchInsert('item_types', itemTypes);
};

const populateGenders = async (knex: Knex): Promise<void> => {
  const genders = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
  ];
  return knex.batchInsert('genders', genders);
};

const populateProfessions = async (knex: Knex): Promise<void> => {
  const professions: any[] = [
    {
      id: 1,
      name: 'Hybrid',
      description:
        'The base class of any inhabitant of this world. The hybrid class stands for user who just started',
    },
    { id: 2, name: 'Warrior', fromProfessionId: 1 },
    { id: 3, name: 'Magician', fromProfessionId: 1 },
    { id: 4, name: 'Archer', fromProfessionId: 1 },
    { id: 5, name: 'Rogue', fromProfessionId: 1 },
    { id: 6, name: 'Adventurer', fromProfessionId: 1 },
    { id: 7, name: 'Daygon', fromProfessionId: 1, extraRaise: 5 },
    { id: 8, name: 'Stray-Hun', fromProfessionId: 7, extraRaise: 5 },
  ];
  return knex.batchInsert('professions', professions);
};

const populateItems = async (knex: Knex): Promise<void> => {
  const items = [
    {
      id: 1,
      name: 'Coin',
      itemTypeId: 4,
      extras: '{}',
      traits: '{}',
      stackable: true,
      worth: 1,
    },
    {
      id: 2,
      name: 'Minor Health Potion',
      itemTypeId: 1,
      extras: JSON.stringify({
        actions: [{ name: 'healCharacter', amount: 15 }],
      }),
      traits: '{}',
      stackable: false,
      worth: 15,
    },
    {
      id: 3,
      name: 'Health Potion',
      itemTypeId: 1,
      extras: JSON.stringify({
        actions: [{ name: 'healCharacter', amount: 25 }],
      }),
      traits: '{}',
      stackable: false,
      worth: 50,
    },
    {
      id: 4,
      name: 'Major Health Potion',
      itemTypeId: 1,
      extras: JSON.stringify({
        actions: [{ name: 'healCharacter', amount: 60 }],
      }),
      traits: '{}',
      stackable: false,
      worth: 250,
    },
    {
      id: 5,
      name: 'Trousers',
      itemTypeId: 2,
      extras: '{}',
      traits: JSON.stringify({ defence: 5 }),
      stackable: false,
      worth: 5,
    },
    {
      id: 6,
      name: 'Shirt',
      itemTypeId: 2,
      extras: '{}',
      traits: JSON.stringify({ defence: 1 }),
      stackable: false,
      worth: 5,
    },
    {
      id: 7,
      name: 'Boots',
      itemTypeId: 2,
      extras: '{}',
      traits: JSON.stringify({ defence: 2 }),
      stackable: false,
      worth: 5,
    },
    {
      id: 8,
      name: 'Small dagger',
      itemTypeId: 3,
      extras: '{}',
      traits: JSON.stringify({ dexterity: 1, strength: 2 }),
      stackable: false,
      worth: 5,
    },
  ];
  return knex.batchInsert('items', items);
};

const populateRegions = async (knex: Knex): Promise<void> => {
  const regions = [{ id: 1, name: 'Mistgarden' }];
  return knex.batchInsert('regions', regions);
};

export async function seed(knex: Knex): Promise<void> {
  await dropper(knex);
  await populateRaces(knex);
  await populateRoles(knex);
  await populateGenders(knex);
  await populateProfessions(knex);
  await populateRegions(knex);
  await populateItemTypes(knex);
  await populateItems(knex);
}

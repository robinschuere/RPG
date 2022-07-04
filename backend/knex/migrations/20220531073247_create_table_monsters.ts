import { Knex } from 'knex';

const dropTableEvents = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('events');
};
const dropTableArchivedEvents = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('events_archived');
};
const dropTableLocationMonsters = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('location_monsters');
};
const dropTableLocationDirections = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('location_directions');
};
const dropTableMonsters = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('monsters');
};
const dropTableGenders = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('genders');
};
const dropTableRaces = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('races');
};
const dropTableRoles = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('roles');
};
const dropTableUsers = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('users');
};
const dropTableProfessions = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('professions');
};
const dropTableLocations = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('locations');
};
const dropTableRegions = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('regions');
};
const dropTableItems = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('items');
};
const dropTableItemTypes = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('item_types');
};
const dropTableLocationMonsterItems = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('location_monster_items');
};
const dropTableLocationMonsterDrops = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('location_monster_drops');
};
const dropTableLocationShops = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('location_shops');
};
const dropTableCharacters = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('characters');
};
const dropTableCharacterStates = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('character_states');
};
const dropTableLocationResources = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('location_resources');
};

const createTableLocationMonsterDrops = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('location_monster_drops', (table) => {
    table.integer('id').primary();
    table
      .integer('locationMonsterId')
      .references('id')
      .inTable('location_monsters')
      .notNullable();
    table.integer('itemId').references('id').inTable('items').notNullable();
    table.integer('chance').notNullable().defaultTo(1);
    table.integer('amount').notNullable().defaultTo(1);
  });
};

const createTableLocationMonsterItems = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('location_monster_items', (table) => {
    table.integer('id').primary();
    table
      .integer('locationMonsterId')
      .references('id')
      .inTable('location_monsters')
      .notNullable();
    table.integer('itemId').references('id').inTable('items').notNullable();
    table.string('slot').notNullable();
  });
};

const createTableLocationMonsters = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('location_monsters', (table) => {
    table.integer('id').primary();
    table
      .integer('monsterId')
      .notNullable()
      .references('id')
      .inTable('monsters');
    table
      .integer('locationId')
      .notNullable()
      .references('id')
      .inTable('locations');
    table.integer('chance').notNullable().defaultTo(1);
    table.integer('dropRolls').notNullable().defaultTo(1);
  });
};

const createTableItems = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('items', (table) => {
    table.integer('id').primary();
    table.string('name').notNullable();
    table.text('description').notNullable().defaultTo('');
    table
      .integer('itemTypeId')
      .references('id')
      .inTable('item_types')
      .notNullable();
    table.jsonb('requirements').notNullable().defaultTo('{}');
    table.jsonb('traits').notNullable().defaultTo('{}');
    table.jsonb('extras').notNullable().defaultTo('[]');
    table.integer('worth').notNullable().defaultTo(1);
    table.specificType('slots', 'varchar[]').nullable().defaultTo(null);
    table.boolean('stackable').notNullable().defaultTo(false);
    table.string('offenceType').notNullable().defaultTo('');
  });
};

const createTableMonsters = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('monsters', (table) => {
    table.integer('id').primary();
    table.string('name').notNullable();
    table.integer('raceId').notNullable().references('id').inTable('races');
    table.integer('genderId').notNullable().references('id').inTable('genders');
    table
      .integer('professionId')
      .notNullable()
      .references('id')
      .inTable('professions');
    table.text('description').notNullable().defaultTo('');
    table.integer('experience').notNullable().defaultTo(1);
    // characteristics
    table.integer('level').notNullable().defaultTo(0);
    table.integer('health').notNullable().defaultTo(0);
    table.integer('strength').notNullable().defaultTo(0);
    table.integer('defence').notNullable().defaultTo(0);
    table.integer('wisdom').notNullable().defaultTo(0);
    table.integer('dexterity').notNullable().defaultTo(0);
    table.integer('intelligence').notNullable().defaultTo(0);
    table.integer('accuracy').notNullable().defaultTo(0);
    table.integer('speed').notNullable().defaultTo(0);
    table.integer('luck').notNullable().defaultTo(0);
  });
};

const createTableEvents = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('events', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('eventType').notNullable();
    table
      .uuid('characterId')
      .references('id')
      .inTable('characters')
      .notNullable();
    table.jsonb('values').notNullable().defaultTo('{}');
    table.boolean('registered').notNullable().defaultTo(false);
    table.timestamps(true, true, true);
  });
};

const createTableArchivedEvents = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('events_archived', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('eventType').notNullable();
    table
      .uuid('characterId')
      .references('id')
      .inTable('characters')
      .notNullable();
    table.jsonb('values').notNullable().defaultTo('{}');
    table.boolean('registered').notNullable().defaultTo(false);
    table.timestamp('createdAt').notNullable();
    table.timestamp('updatedAt').notNullable();
    table.timestamp('archivedAt').notNullable();
  });
};

const createTableUsers = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('firstname').defaultTo('');
    table.string('lastname').defaultTo('');
    table.string('email').unique().notNullable();
    table.string('password').notNullable();
    table.integer('roleId').references('id').inTable('roles').notNullable();
    table.string('token').nullable().unique();
    table.string('recoveryToken').nullable().unique();
    table.string('verificationToken').nullable().unique();
    table.boolean('verified').notNullable().defaultTo(false);
    table.boolean('sentVerificationEmail').notNullable().defaultTo(false);
  });
};

const createTableRoles = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('roles', (table) => {
    table.integer('id').primary();
    table.string('name').unique().notNullable();
  });
};

const createTableRaces = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('races', (table) => {
    table.integer('id').primary();
    table.string('name').unique().notNullable();
    table.boolean('starter').notNullable().defaultTo(false);
    table.text('description').notNullable().defaultTo('');
    table.integer('extraRaise').notNullable().defaultTo(0);
  });
};

const createTableProfessions = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('professions', (table) => {
    table.integer('id').primary();
    table.string('name').unique().notNullable();
    table
      .integer('fromProfessionId')
      .references('id')
      .inTable('professions')
      .nullable();
    table.text('description').notNullable().defaultTo('');
    table.integer('extraRaise').notNullable().defaultTo(0);
  });
};

const createTableItemTypes = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('item_types', (table) => {
    table.integer('id').primary();
    table.string('name').unique().notNullable();
    table.text('description').notNullable().defaultTo('');
  });
};

const createTableGenders = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('genders', (table) => {
    table.integer('id').primary();
    table.string('name').unique().notNullable();
    table.text('description').notNullable().defaultTo('');
  });
};

const createTableRegions = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('regions', (table) => {
    table.integer('id').primary();
    table.string('name').unique().notNullable();
    table.text('description').notNullable().defaultTo('');
  });
};

const createTableLocations = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('locations', (table) => {
    table.integer('id').primary();
    table.integer('regionId').references('id').inTable('regions').notNullable();
    table.string('name').notNullable();
    table.text('description').notNullable().defaultTo('');
    table.text('locationType').notNullable().defaultTo('');
  });
};

const createTableLocationResources = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('location_resources', (table) => {
    table.integer('id').primary();
    table
      .integer('locationId')
      .references('id')
      .inTable('locations')
      .notNullable();
    table.integer('itemId').references('id').inTable('items').notNullable();
    table.integer('amount').notNullable().defaultTo(1);
    table.integer('chance').notNullable().defaultTo(1);
  });
};

const createTableLocationShops = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('location_shops', (table) => {
    table.integer('id').primary();
    table
      .integer('locationId')
      .references('id')
      .inTable('locations')
      .notNullable();
    table.string('name').notNullable();
    table.text('description').notNullable().defaultTo('');
    table.jsonb('sales').notNullable().defaultTo('{}');
  });
};

const createTableLocationDirections = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('location_directions', (table) => {
    table.integer('id').primary();
    table
      .integer('currentLocationId')
      .references('id')
      .inTable('locations')
      .notNullable();
    table.string('direction').notNullable();
    table
      .integer('directionLocationId')
      .references('id')
      .inTable('locations')
      .notNullable();
  });
};

const createTableCharacters = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('characters', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.uuid('userId').references('id').inTable('users').notNullable();
    table.string('name').notNullable();
    table.integer('genderId').references('id').inTable('genders').notNullable();
    table.integer('raceId').references('id').inTable('races').notNullable();
    // statistics
    table.integer('level').notNullable().defaultTo(0);
    table.integer('experience').notNullable().defaultTo(0);
    table.integer('totalExperience').notNullable().defaultTo(0);
    table.integer('health').notNullable().defaultTo(0);
    table.integer('strength').notNullable().defaultTo(0);
    table.integer('defence').notNullable().defaultTo(0);
    table.integer('wisdom').notNullable().defaultTo(0);
    table.integer('dexterity').notNullable().defaultTo(0);
    table.integer('intelligence').notNullable().defaultTo(0);
    table.integer('accuracy').notNullable().defaultTo(0);
    table.integer('speed').notNullable().defaultTo(0);
    table.integer('luck').notNullable().defaultTo(0);
    // to raise
    table.integer('points').notNullable().defaultTo(0);
    table.specificType('professionIds', 'INT[]').notNullable();
  });
};

const createTableCharacterStates = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('character_states', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid('characterId')
      .references('id')
      .inTable('characters')
      .notNullable();
    table
      .integer('locationId')
      .references('id')
      .inTable('locations')
      .notNullable()
      .defaultTo(1);
    table.jsonb('characterCombatState').defaultTo('{}');
    table.string('stageType').notNullable().defaultTo('IDLE');
    table.jsonb('stageValues').notNullable().defaultTo('{}');
    table.jsonb('gear').notNullable().defaultTo('[]');
    table.jsonb('inventory').notNullable().defaultTo('[]');
    table.string('screenType').notNullable().defaultTo('WORLD');
    table.unique(['characterId']);
  });
};

export async function up(knex: Knex): Promise<void> {
  await knex.raw('create extension if not exists "uuid-ossp"');
  await createTableRoles(knex);
  await createTableRaces(knex);
  await createTableGenders(knex);
  await createTableProfessions(knex);
  await createTableRegions(knex);
  await createTableItemTypes(knex);
  await createTableUsers(knex);
  await createTableLocations(knex);
  await createTableMonsters(knex);
  await createTableItems(knex);
  await createTableLocationResources(knex);
  await createTableLocationDirections(knex);
  await createTableLocationShops(knex);
  await createTableLocationMonsters(knex);
  await createTableLocationMonsterItems(knex);
  await createTableLocationMonsterDrops(knex);
  await createTableCharacters(knex);
  await createTableCharacterStates(knex);
  await createTableEvents(knex);
  await createTableArchivedEvents(knex);
}

export async function down(knex: Knex): Promise<void> {
  await dropTableArchivedEvents(knex);
  await dropTableEvents(knex);
  await dropTableCharacterStates(knex);
  await dropTableCharacters(knex);
  await dropTableLocationMonsterDrops(knex);
  await dropTableLocationMonsterItems(knex);
  await dropTableLocationMonsters(knex);
  await dropTableLocationResources(knex);
  await dropTableItems(knex);
  await dropTableUsers(knex);
  await dropTableMonsters(knex);
  await dropTableLocationDirections(knex);
  await dropTableLocationShops(knex);
  await dropTableLocations(knex);
  await dropTableItemTypes(knex);
  await dropTableRegions(knex);
  await dropTableProfessions(knex);
  await dropTableGenders(knex);
  await dropTableRaces(knex);
  await dropTableRoles(knex);
  await knex.raw('drop extension if exists "uuid-ossp"');
}

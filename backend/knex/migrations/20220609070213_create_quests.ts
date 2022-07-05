import { Knex } from 'knex';

const dropTableQuests = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('quests');
};
const dropTableQuestRequirements = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('quest_requirements');
};
const dropTableQuestSteps = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('quest_steps');
};
const dropTableQuestRewards = (knex: Knex): Promise<void> => {
  return knex.schema.dropTableIfExists('quest_rewards');
};

const createTableQuests = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('quests', (table) => {
    table.integer('id').primary();
    table.string('name').notNullable().unique();
    table.text('description').notNullable().defaultTo('');
  });
};

const createTableRequirements = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('quest_requirements', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.integer('questId').references('id').inTable('quests').notNullable();
    table.integer('level').notNullable().defaultTo(0);
    table.jsonb('characteristics').notNullable().defaultTo('{}');
    table.jsonb('quests').notNullable().defaultTo('{}');
  });
};

const createTableQuestSteps = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('quest_steps', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.string('name').notNullable();
    table.text('description').notNullable().defaultTo('');
    table.integer('questId').references('id').inTable('quests').notNullable();
    table.integer('step').notNullable();
    table.unique(['questId', 'step']);
  });
};

const createTableQuestRewards = (knex: Knex): Promise<void> => {
  return knex.schema.createTable('quest_rewards', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.integer('questId').references('id').inTable('quests').notNullable();
    table.jsonb('rewardEvents').notNullable().defaultTo('{}');
  });
};

export async function up(knex: Knex): Promise<void> {
  await createTableQuests(knex);
  await createTableRequirements(knex);
  await createTableQuestSteps(knex);
  await createTableQuestRewards(knex);
}

export async function down(knex: Knex): Promise<void> {
  await dropTableQuestRewards(knex);
  await dropTableQuestSteps(knex);
  await dropTableQuestRequirements(knex);
  await dropTableQuests(knex);
}

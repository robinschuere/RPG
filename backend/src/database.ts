import knex, { Knex } from 'knex';
import config from '../knexfile';

const database: Knex = knex(config.development);

export default database;

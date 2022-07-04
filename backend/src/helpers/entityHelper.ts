import { Knex } from 'knex';
import database from '../database';

interface Entity {
  getTable: () => Knex.QueryBuilder<any>;
  getAll: () => Promise<any>;
  getById: (id: string | number) => Promise<any>;
  insert: (data: any) => Promise<any>;
  update: (id: string | number, data) => Promise<any>;
  remove: (id: string | number) => Promise<any>;
}

export const getEntity = (name: string): Entity => {
  const getTable = (): Knex.QueryBuilder<any> => database(name);

  const getAll = (): Promise<Knex<any[]>> => getTable().select();

  const getById = async (id: string | number): Promise<Knex<any>> => {
    if (id) {
      const result = await getTable().where({ id }).first().select();
      return result;
    }
  };

  const insert = (data): Promise<any> => getTable().insert(data).returning('*');

  const update = (id: string | number, data): Promise<any> =>
    getTable().where({ id }).update(data).returning('*');

  const remove = (id: string | number): Promise<any> =>
    getTable().where({ id }).delete().returning('*');

  return {
    getTable,
    getAll,
    getById,
    insert,
    update,
    remove,
  };
};

import { getEntity } from './entityHelper';

const defaultFromMapper = (value) => value;

const defaultToMapper = (value) => {
  const { id: _id, ...rest } = value;
  return rest;
};

export const getRouteValues = (
  tableName: string,
  mapFrom: any = defaultFromMapper,
  mapTo: any = defaultToMapper,
) => {
  return {
    getAll: async (_, res): Promise<void> => {
      const values = await getEntity(tableName).getAll();
      const mapped = values.map(mapFrom);
      return res.json(mapped);
    },
    get: async (req, res): Promise<void> => {
      const { id } = req.params;
      const value = await getEntity(tableName).getById(id);
      if (value) {
        const mapped = mapFrom(value);
        return res.json(mapped);
      } else {
        console.log(
          `table '${tableName}' does not hold an id with value '${id}'`,
        );
        return res.status(404).send('NOT FOUND');
      }
    },
    insert: async (req, res, next): Promise<void> => {
      const { data } = req.body;
      try {
        const [value] = await getEntity(tableName).insert(data);
        const mapped = mapFrom(value);
        return res.json(mapped);
      } catch (e) {
        next(e);
      }
    },
    update: async (req, res, next): Promise<void> => {
      const { id } = req.params;
      const { data } = req.body;
      try {
        const existing = await getEntity(tableName).getById(id);
        const newValues = mapTo({ ...existing, ...data });
        const updated = await getEntity(tableName).update(id, newValues);
        const mapped = mapFrom(updated);
        return res.json(mapped);
      } catch (e) {
        next(e);
      }
    },
    remove: async (req, res, next): Promise<void> => {
      const { id } = req.params;
      try {
        const value = await getEntity(tableName).remove(id);
        const mapped = mapFrom(value);
        return res.json(mapped);
      } catch (e) {
        next(e);
      }
    },
  };
};

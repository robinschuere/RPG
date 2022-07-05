export interface ChanceObject {
  id: string | number;
  chance: number;
}

/**
 * Will return a random value based on a given object
 * @param chanceCounter an chanceCounter object like { 1: 'A', 2: 'B', ...} 
 * @returns the key of the object ie. 2
 */
export const randomizer = (chanceCounter: any) => () =>
  Math.floor(Math.random() * Object.keys(chanceCounter).length);

/**
 * Will create a chanceCounter object like { 1: 'A', 2: 'B', 3: 'A', ...} 
 * where the values represent there respective chance in the complete value
 * IMPORTANT: Has no opinion about correct chances ...
 * @param values an list of objects which have at least an id and a chance rate
 * @returns a chanceCounter object like { 1: 'A', 2: 'B', ...}
 */
export const createChanceCounter = (values: ChanceObject[]) => {
  const chanceCounter = {};
  values.forEach(({ id, chance }) => {
    const firstKey = Object.keys(chanceCounter).length;
    for (let i = 0; i < chance; i++) {
      const key = firstKey + i;
      chanceCounter[key] = id;
    }
  });
  return chanceCounter;
};

/**
 * Combines the createChanceCounter and randomizer for simple logic functionalities
 * @param entityValues the array of entities (holds a property id and chance)
 * @returns a random selected entity from the array
 */
export const getRandomValueFromEntities = (entityValues: any[]) => {
  const entityChance = createChanceCounter(entityValues);
  const random = randomizer(entityChance);
  const entityId = entityChance[random()];
  return entityValues.find(s => s.id === entityId);
}
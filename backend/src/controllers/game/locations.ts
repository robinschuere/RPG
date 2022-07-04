import { getEntity } from '../../helpers/entityHelper';
import { getRouteValues } from '../../helpers/routeHelper';

const routeValues = getRouteValues('locations');
const locationDirections = getEntity('location_directions');
const locationsMonsters = getEntity('location_monsters');

export const getAllLocations = routeValues.getAll;
export const getLocationById = routeValues.get;

export const getLocationDirections = async (req, res, _next) => {
  const { id: currentLocationId } = req.params;
  const directions = await locationDirections
    .getTable()
    .where({ currentLocationId })
    .select();
  return res.json(directions);
};

export const getLocationMonsters = async (req, res, _next) => {
  const { id: locationId } = req.params;
  const monsters = await locationsMonsters
    .getTable()
    .where({ locationId })
    .select();
  return res.json({ hasMonsters: monsters.length > 0 });
};

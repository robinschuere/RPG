import express from 'express';
import {
  getAllLocations,
  getLocationById,
  getLocationDirections,
  getLocationMonsters,
} from '../../controllers/game/locations';

const app = express();

app.get('/', getAllLocations);
app.get('/:id', getLocationById);
app.get('/:id/directions', getLocationDirections);
app.get('/:id/monsters', getLocationMonsters);

export default app;

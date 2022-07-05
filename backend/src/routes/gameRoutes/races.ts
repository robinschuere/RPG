import express from 'express';
import { getRouteValues } from '../../helpers/routeHelper';

const routeValues = getRouteValues('races');

const app = express();

app.get('/', routeValues.getAll);
app.get('/:id', routeValues.get);

export default app;

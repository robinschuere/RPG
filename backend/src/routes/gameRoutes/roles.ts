import express from 'express';
import { getRouteValues } from '../../helpers/routeHelper';

const routeValues = getRouteValues('roles');

const app = express();

app.get('/', routeValues.getAll);
app.get('/:id', routeValues.get);

export default app;

import express from 'express';
import { getRouteValues } from '../../helpers/routeHelper';

const routeValues = getRouteValues('users');

const app = express();

app.get('/', routeValues.getAll);
app.get('/:id', routeValues.get);
app.put('/:id', routeValues.update);
app.delete('/:id', routeValues.get);

export default app;

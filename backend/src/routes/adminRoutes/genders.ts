import express from 'express';
import { getRouteValues } from '../../helpers/routeHelper';

const routeValues = getRouteValues('genders');

const app = express();

app.get('/', routeValues.getAll);
app.post('/', routeValues.insert);
app.get('/:id', routeValues.get);
app.put('/:id', routeValues.update);
app.delete('/:id', routeValues.remove);

export default app;

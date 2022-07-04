import express from 'express';
import { getRouteValues } from '../../helpers/routeHelper';

const routeValues = getRouteValues('monsters');

const app = express();

app.get('/:id', routeValues.get);

export default app;

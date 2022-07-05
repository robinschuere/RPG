import express from 'express';
import { getRouteValues } from '../../helpers/routeHelper';

const routeValues = getRouteValues('characters');

const app = express();

app.get('/:id', routeValues.get);

export default app;

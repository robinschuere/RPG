import express from 'express';
import { getAll } from '../controllers/characters';

const app = express();

app.get('/', getAll);

export default app;

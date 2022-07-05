import express from 'express';
import genders from './genders';
import races from './races';
import roles from './roles';
import locations from './locations';
import characters from './characters';
import monsters from './monsters';
import items from './items';

const app = express();

app.use('/genders', genders);
app.use('/races', races);
app.use('/roles', roles);
app.use('/locations', locations);
app.use('/characters', characters);
app.use('/monsters', monsters);
app.use('/items', items);
/**
 * The game route holds all route information for game purposes.
 * this means that standard operations like GET are supported
 */
export default app;

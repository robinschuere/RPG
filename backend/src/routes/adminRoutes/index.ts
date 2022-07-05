import express from 'express';
import genders from './genders';
import roles from './roles';
import users from './users';

const app = express();

app.use('/genders', genders);
app.use('/roles', roles);
app.use('/users', users);
/**
 * The admin route holds all route information for admin purposes.
 * This means that almost always all CRUD operations are available for an admin
 */
export default app;

import express from 'express';
import genders from './genders';
import races from './races';
import roles from './roles';
import users from './users';
import monsters from './monsters';
import locations from './locations';
import locationMonsters from './locationMonsters';
import locationMonsterItems from './locationMonsterItems';
import locationMonsterDrops from './locationMonsterDrops';

const app = express();

// users
app.use('/users', users);
app.use('/roles', roles);
// game entities
app.use('/genders', genders);
app.use('/races', races);
app.use('/monsters', monsters);
app.use('/locations', locations);
app.use('/locationmonsters', locationMonsters);
app.use('/locationmonsteritems', locationMonsterItems);
app.use('/locationmonsterdrops', locationMonsterDrops);
/**
 * The admin route holds all route information for admin purposes.
 * This means that almost always all CRUD operations are available for an admin
 */
export default app;

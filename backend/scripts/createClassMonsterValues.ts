import 'colors';
import { createArcher } from '../knex/helpers/createArcher';
import { createMage } from '../knex/helpers/createMage';
import { createWarrior } from '../knex/helpers/createWarrior';

const createWarriors = (
  level = 1,
  amount = 1,
  startId = 1,
  name: string,
  raceId: number,
) => {
  for (let index = 0; index < amount; index++) {
    console.log(createWarrior({ level, id: startId + index, name, raceId }));
  }
  return amount;
};

const createArchers = (
  level = 1,
  amount = 1,
  startId = 1,
  name: string,
  raceId: number,
) => {
  for (let index = 0; index < amount; index++) {
    console.log(createArcher({ level, id: startId + index, name, raceId }));
  }
  return amount;
};

const createMages = (
  level = 1,
  amount = 1,
  startId = 1,
  name: string,
  raceId: number,
) => {
  for (let index = 0; index < amount; index++) {
    console.log(createMage({ level, id: startId + index, name, raceId }));
  }
  return amount;
};

const getIntValue = (values, name, fallback) => {
  const index = values.findIndex((s) => s === name);

  const value = index > -1 ? values[index + 1] : `${fallback}`;
  return parseInt(value, 10);
};

const getValue = (values, name) => {
  const index = values.findIndex((s) => s === name);

  return index > -1 ? values[index + 1] : '';
};

const main = (values: string[]) => {
  if (values.find((s) => ['-h', '--help'].includes(s))) {
    console.log();
    console.log('Monster Creation HELP'.blue);
    console.log('====================='.blue);
    console.log();
    console.log('This script is designed to create values for monsters.'.blue);
    console.log();
    console.log('What does it do?'.blue);
    console.log('-----------------'.blue);
    console.log(
      'This script will generate random monsters based on the normal growth. (Growth rate is a config variable)'
        .blue,
    );
    console.log(
      'These monsters can then be imported through a migration script'.blue,
    );
    console.log();
    console.log('Useful commands'.blue);
    console.log('-----------------'.blue);
    console.log('  w      a monster of the Warrior class will be made'.blue);
    console.log('  a      a monster of the Archer class will be made'.blue);
    console.log(
      '  -l     define the level of the monster (defaults to 1)'.blue,
    );
    console.log(
      '  -a     define the amount of created monsters (defaults to 1)'.blue,
    );
    console.log(
      '  -i     define the starting id of created monsters (defaults to 1)'
        .blue,
    );
    console.log(
      '  -n     define the name of created monsters (defaults to 1)'.blue,
    );
    console.log(
      '  -r     define the starting race of created monsters (defaults to 0 === UNKNOWN)'
        .blue,
    );
    console.log();
    console.log(
      'These commands can be created in sync. Meaning that it is possible to create multiple classes. The amount is then created for each class that is subject.'
        .blue,
    );
    console.log();
    return Promise.resolve();
  }
  const level = getIntValue(values, '-l', 1);
  const amount = getIntValue(values, '-a', 1);
  const startId = getIntValue(values, '-i', 1);
  const raceId = getIntValue(values, '-r', 0);

  const name = getValue(values, '-n');

  let id = startId;

  if (values.find((s) => s === 'w')) {
    const newId = createWarriors(level, amount, id, name, raceId);
    id = newId;
  }

  if (values.find((s) => s === 'a')) {
    const newId = createArchers(level, amount, id, name, raceId);
    id = newId;
  }

  if (values.find((s) => s === 'm')) {
    const newId = createMages(level, amount, id, name, raceId);
    id = newId;
  }

  return Promise.resolve();
};

main(process.argv)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

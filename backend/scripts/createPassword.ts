import 'colors';
import { encryptPassword } from '../src/helpers/encryptionHelper';

const main = async (values: string[]) => {
  if (values.find((s) => ['-h', '--help'].includes(s))) {
    console.log();
    console.log('Password Creation HELP'.blue);
    console.log('====================='.blue);
    console.log();
    console.log(
      'This script is designed to create a password through the same password generation that is used in the application.'
        .blue,
    );
    console.log();
    console.log('What does it do?'.blue);
    console.log('-----------------'.blue);
    console.log(
      'This script will generate a password based on the value that is given'
        .blue,
    );
    console.log();
    return Promise.resolve();
  }

  const password = values[2];

  const hash = await encryptPassword(password);

  console.log('Your password hashed value is'.red);
  console.log('-----------------------------'.red);
  console.log();
  console.log(`${hash}`.red);
  console.log();
  console.log('You can copy and paste this value inside the database'.red);

  return Promise.resolve();
};

main(process.argv)
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

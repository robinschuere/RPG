import database from '../database';
import { v4 as uuid } from 'uuid';
import {
  checkForgotToken,
  checkToken,
  comparePassword,
  createForgotToken,
  createWebToken,
  encryptPassword,
} from '../helpers/encryptionHelper';
import {
  sendForgotEmail,
  sendVerificationEmail,
} from '../services/mailService';
import config from '../../config';

interface User {
  firstname: string;
  lastname: string;
  email: string;
  verified: boolean;
}

const mapFrom = (user: any): User => {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    verified: !user.verificationToken,
  };
};

const mapTo = (user: User): any => {
  return {
    firstname: user.firstname,
    lastname: user.lastname,
  };
};

export const login = async (req, res) => {
  const { credentials } = req.body;
  const [email, password] = atob(credentials).split(':');
  const result = await database('users').where({ email }).first().select();
  if (!result) {
    return res.status(400).json({ message: 'user does not exist' });
  }
  const match = await comparePassword(password, result.password);
  if (match) {
    const { verified } = await checkToken(result.token);
    if (verified && result.token) {
      return res.json({ token: result.token });
    }
    const token = createWebToken(result.id, result.email, result.roleId);
    await database('users')
      .where({ id: result.id })
      .update({ ...result, token, recoveryToken: null });
    return res.json({ token });
  }
};

export const alive = async (req, res) => {
  return res.send('OK');
};

export const logout = async (req, res) => {
  const { userId } = req.headers;
  await database('users').where({ id: userId }).update({ token: null });
  return res.send('OK');
};

export const register = async (req, res) => {
  const { user = {}, credentials } = req.body;
  const [email, password] = atob(credentials).split(':');
  const result = await database('users')
    .where({ email: email })
    .first()
    .select();
  if (result) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const hash = await encryptPassword(password);

  if (config.app.withVerification) {
    const verificationToken = uuid();
    const sentVerificationEmail = await sendVerificationEmail(
      verificationToken,
      email,
    );

    await database('users').insert({
      ...user,
      email,
      password: hash,
      verificationToken,
      roleId: 0,
      sentVerificationEmail,
    });

    return res.send('OK');
  } else {
    await database('users').insert({
      ...user,
      email,
      password: hash,
      verificationToken: null,
      roleId: 0,
      verified: true,
      sentVerificationEmail: true,
    });

    return res.send('OK');
  }
};

export const verify = async (req, res) => {
  const { credentials } = req.body;
  const [verificationToken, password] = atob(credentials).split(':');
  const result = await database('users')
    .where({ verificationToken })
    .first()
    .select();
  if (!result) {
    return res
      .status(400)
      .json({ message: 'Verification token does not exist' });
  }
  const match = await comparePassword(password, result.password);
  if (!match) {
    return res.status(401).json({ message: 'Password is incorrect' });
  }
  await database('users')
    .where({ id: result.id })
    .update({
      ...result,
      verified: true,
      verificationToken: null,
    });

  return res.send('OK');
};

export const resendVerification = async (req, res) => {
  const { credentials } = req.body;
  const [email] = atob(credentials).split(':');

  const result = await database('users')
    .where({ email: email })
    .first()
    .select();

  if (!result.verificationToken) {
    return res.status(400).json({ message: 'User is already verified' });
  }

  if (config.app.withVerification) {
    await sendVerificationEmail(result.verificationToken, email);
  }
  return res.send('OK');
};

export const forget = async (req, res, _next) => {
  const { email } = req.body;
  const result = await database('users').where({ email }).first().select();
  if (!result) {
    return res.status(401).json({ message: 'User does not exist' });
  }

  if (config.app.withVerification) {
    if (!result.verified) {
      await sendVerificationEmail(result.verificationToken, email);
    } else if (result.verificationToken) {
      await sendForgotEmail(result.verificationToken, result.email);
    } else {
      const verificationToken = await createForgotToken(email);
      await database('users')
        .where({ email })
        .update({ ...result, verificationToken });
      await sendForgotEmail(verificationToken, result.email);
    }
    return res.send('OK');
  }
  return res.send('OK');
};

export const getUser = async (req, res, _next) => {
  const { authorization } = req.headers;
  const result = await database('users')
    .where({ token: authorization })
    .first()
    .select();

  const mapped = mapFrom(result);
  return res.json(mapped);
};

export const updateUser = async (req, res, _next) => {
  const { authorization } = req.headers;
  const { data } = req.body;

  const toUpdate = mapTo(data);
  const [updated] = await database('users')
    .where({ token: authorization })
    .update(toUpdate)
    .returning('*');

  return res.json(mapFrom(updated));
};

export const remember = async (req, res, _next) => {
  const { credentials } = req.body;
  const [verificationToken, password] = atob(credentials).split(':');
  const result = await database('users')
    .where({ verificationToken })
    .first()
    .select();
  if (!result) {
    return res.status(401).json({
      message: 'Verification token does not exist',
    });
  }

  const { verified } = await checkForgotToken(verificationToken);
  if (verified) {
    return res.status(400).json({
      message: 'Link expired',
    });
  }
  const hash = encryptPassword(password);

  await database('users')
    .where({ verificationToken })
    .update({
      ...result,
      verificationToken: null,
      password: hash,
    });

  return res.send('OK');
};

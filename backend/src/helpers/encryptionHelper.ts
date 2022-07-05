import bcrypt from 'bcrypt';
import config from '../../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import database from '../database';

export const encryptPassword = async (password) => {
  const hash = await bcrypt.hash(password, 10);
  return hash;
};

export const comparePassword = async (password, hashword) => {
  const match = await bcrypt.compare(password, hashword);
  return match;
};

export const createForgotToken = (email: string): string => {
  return jwt.sign(
    {
      email,
      exp:
        Math.floor(Date.now() / 1000) + 60 * 60 * config.app.forgetExpiration,
    },
    config.app.secret,
  );
};

export const checkForgotToken = async (
  verificationToken,
): Promise<TokenResponse> => {
  if (!verificationToken) {
    return { verified: false };
  }
  const result = await database('users')
    .where({ verificationToken })
    .first()
    .select();
  if (!result) {
    return { verified: false };
  }
  try {
    const verified = (await jwt.verify(
      verificationToken,
      config.app.secret,
    )) as JwtPayload;
    return {
      verified: true,
      email: verified.email,
    };
  } catch (e) {
    await database('users')
      .where({ verificationToken })
      .update({ ...result, verificationToken: null });
    return { verified: false };
  }
};

export const createWebToken = (
  userId: string,
  email: string,
  role: number,
): string => {
  return jwt.sign(
    { userId, email, role, exp: Math.floor(Date.now() / 1000) + 60 * 60 },
    config.app.secret,
  );
};

export interface TokenResponse {
  verified: boolean;
  userId?: string;
  email?: string;
  isAdmin?: boolean;
}
export const checkToken = async (token): Promise<TokenResponse> => {
  if (!token) {
    return { verified: false };
  }
  const result = await database('users').where({ token }).first().select();
  if (!result) {
    return { verified: false };
  }
  try {
    const verified = (await jwt.verify(token, config.app.secret)) as JwtPayload;
    if (verified.role === 9001) {
      return {
        verified: true,
        isAdmin: true,
        userId: verified.userId,
        email: verified.email,
      };
    }
    return {
      verified: true,
      isAdmin: false,
      userId: verified.userId,
      email: verified.email,
    };
  } catch (e) {
    await database('users')
      .where({ id: result.id })
      .update({ ...result, token: null });
    return { verified: false };
  }
};

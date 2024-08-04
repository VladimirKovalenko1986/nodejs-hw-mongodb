import { randomBytes } from 'node:crypto';
import Session from '../db/Session.js';
import {
  ACCESS_TOKEN_LIFETIME,
  REFRESH_TOKEN_LIFETIME,
} from '../constants/index.js';

const findSession = (filter) => Session.findOne(filter);

const createSession = async (userId) => {
  await Session.deleteOne({ userId });
  const accessToken = randomBytes(30).toString('base64');
  const refreshToken = randomBytes(30).toString('base64');

  const accessTokenValidUntil = new Date(Date.now() + ACCESS_TOKEN_LIFETIME);
  const refreshTokenValidUntil = new Date(Date.now() + REFRESH_TOKEN_LIFETIME);

  console.log('Access Token:', accessToken);
  console.log('Refresh Token:', refreshToken);

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil,
    refreshTokenValidUntil,
  });
};

const deleteSession = (filter) => Session.deleteOne(filter);

export { createSession, findSession, deleteSession };

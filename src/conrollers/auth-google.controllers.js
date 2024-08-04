import {
  createGoogleAuthUrl,
  validateCode,
  getGooglrOAuthName,
} from '../utils/googleOAuth2.js';
import { setupResponseSession } from './auth-controllers.js';
import createHttpError from 'http-errors';
import { findUser, signup } from '../services/auth-services.js';
import { createSession } from '../services/session-services.js';
import { randomBytes } from 'node:crypto';

const getGoogleOAuthUrlController = async (req, res) => {
  const url = createGoogleAuthUrl();
  res.json({
    status: 200,
    message: 'Successfully get Google OAuth url!',
    data: {
      url,
    },
  });
};

const loginWithGoogleController = async (req, res) => {
  const { code } = req.body;
  const ticket = await validateCode(code);
  const userPayload = ticket.getPayload();
  if (!userPayload) {
    throw createHttpError(401);
  }

  let user = await findUser({ email: userPayload.email });

  if (!user) {
    const signupData = {
      email: userPayload.email,
      password: randomBytes(10),
      name: getGooglrOAuthName(userPayload),
    };
    user = await signup(signupData);
  }

  const session = await createSession(user._id);

  setupResponseSession(res, session);

  res.status(200).json({
    status: 200,
    message: `Successfully login a ${user.name}!`,
    data: { accessToken: session.accessToken },
  });
};

export { getGoogleOAuthUrlController, loginWithGoogleController };

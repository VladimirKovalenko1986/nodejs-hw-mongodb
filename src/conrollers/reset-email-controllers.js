import handlebars from 'handlebars';
import path from 'node:path';
import fs from 'node:fs/promises';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import {
  requestResetToken,
  resetPassword,
} from '../services/reset-email-services.js';
import env from '../utils/env.js';
import { sendEmail } from '../utils/sendEmail.js';
import { TEMPLATES_DIR } from '../constants/index.js';
import User from '../db/User.js';

const requestResetEmailController = async (req, res, next) => {
  const { email } = req.body;
  const user = await requestResetToken({ email });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const resetToken = jwt.sign(
    {
      sub: user._id,
      email,
    },
    env('JWT_SECRET'),
    {
      expiresIn: '5m',
    },
  );

  const resetPasswordTemplatePath = path.join(
    TEMPLATES_DIR,
    'reset-password-email.html',
  );

  const templateSource = await fs.readFile(resetPasswordTemplatePath, 'utf-8');

  const template = handlebars.compile(templateSource);
  const html = template({
    name: user.name,
    link: `${env('APP_DOMAIN')}/reset-password?token=${resetToken}`,
  });

  try {
    await sendEmail({
      from: env('SMTP_FROM'),
      to: email,
      subject: 'Reset your password',
      html,
    });
  } catch (error) {
    return next(
      createHttpError(
        500,
        'Failed to send the email, please try again later.',
        error.message,
      ),
    );
  }

  await requestResetToken(req.body.email);
  res.json({
    message: 'Reset password email was successfully sent!',
    status: 200,
    data: {},
  });
};

const resetPasswordController = async (req, res) => {
  let entries;
  try {
    entries = jwt.verify(req.body.token, env('JWT_SECRET'));
  } catch (err) {
    if (err instanceof Error)
      throw createHttpError(401, 'Token is expired or invalid.');
    throw err;
  }

  const user = await User.findOne({
    email: entries.email,
    _id: entries.sub,
  });

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const encryptedPassword = await bcrypt.hash(req.body.password, 10);

  await User.updateOne({ _id: user._id }, { password: encryptedPassword });

  await resetPassword(req.body);
  res.json({
    message: 'Password has been successfully reset.',
    status: 200,
    data: {},
  });
};

export { requestResetEmailController, resetPasswordController };

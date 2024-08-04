import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  userSignupSchema,
  userSigninSchema,
} from '../validation/user-schems.js';
import {
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validation/send-reset-email-schems.js';
import {
  signupController,
  signinController,
  refreshConroller,
  logoutController,
} from '../conrollers/auth-controllers.js';
import {
  requestResetEmailController,
  resetPasswordController,
} from '../conrollers/reset-email-controllers.js';
import {
  getGoogleOAuthUrlController,
  loginWithGoogleController,
} from '../conrollers/auth-google.controllers.js';
import { loginWithGoogleOAuthSchema } from '../validation/auth-google.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(userSignupSchema),
  ctrlWrapper(signupController),
);

authRouter.post(
  '/login',
  validateBody(userSigninSchema),
  ctrlWrapper(signinController),
);

authRouter.post('/refresh', ctrlWrapper(refreshConroller));

authRouter.post('/logout', ctrlWrapper(logoutController));

authRouter.post(
  '/send-reset-email',
  validateBody(requestResetEmailSchema),
  ctrlWrapper(requestResetEmailController),
);

authRouter.post(
  '/reset-pwd',
  validateBody(resetPasswordSchema),
  ctrlWrapper(resetPasswordController),
);

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthUrlController));
authRouter.post(
  '/confirm-oauth',
  validateBody(loginWithGoogleOAuthSchema),
  ctrlWrapper(loginWithGoogleController),
);

export default authRouter;

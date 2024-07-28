import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import {
  userSignupSchema,
  userSigninSchema,
  userGoogleAuthCodeSchema,
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
  getGoogleOAuthController,
  authGoogleContrpller,
} from '../conrollers/auth-controllers.js';
import {
  requestResetEmailController,
  resetPasswordController,
} from '../conrollers/reset-email-controllers.js';

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

authRouter.get('/get-oauth-url', ctrlWrapper(getGoogleOAuthController));

authRouter.post(
  '/confirm-google-auth',
  validateBody(userGoogleAuthCodeSchema),
  ctrlWrapper(authGoogleContrpller),
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

export default authRouter;

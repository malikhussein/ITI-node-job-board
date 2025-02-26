import { Router } from 'express';
import * as authRoutesService from '../controllers/auth.controller.js';
import { validation } from '../middleware/joi.middleware.js';
import {
  signInJoiSchema,
  signUpJoiSchema,
} from '../config/joi.validation.js';

const authRoutes = Router();

authRoutes.post(
  '/signUp',
  validation(signUpJoiSchema), // validate sign up request
  authRoutesService.register
);
authRoutes.post(
  '/login',
  validation(signInJoiSchema), // validate sign in request
  authRoutesService.login
);
authRoutes.get('/verify/:token', authRoutesService.verifyEmail);

export default authRoutes;

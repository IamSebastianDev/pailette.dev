/** @format */

import express from 'express';
import { createUserController } from './controllers/createUser.controller';
import { getUserController } from './controllers/getUser.controller';
import { BadRequestError, NotAuthorizedError, NotFoundError } from '@pai/kzw';
import { loginUserController } from './auth/controllers/loginUser.controller';
import { logoutUserController } from './auth/controllers/logoutUser.controller';
import { øAuth } from '../../middlewares/user/øAuth.middleware';
import { refreshUserTokenController } from './auth/controllers/refreshUserToken.controller';

export const userController = express.Router();

userController.get('/:id', øAuth, getUserController);
userController.post('/', øAuth, createUserController);
userController.post('/auth/login', loginUserController);
userController.get('/auth/logout', øAuth, logoutUserController);
userController.post('/auth/refresh', refreshUserTokenController);
userController.use(
    NotFoundError.intercept('[User] '),
    BadRequestError.intercept('[User]'),
    NotAuthorizedError.intercept('[User]')
);

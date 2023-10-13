/** @format */

import express from 'express';
import { createUserController } from './controllers/createUser.controller';
import { getUserController } from './controllers/getUser.controller';
import { BadRequestError, NotFoundError } from '@pai/kzw';
import { loginUserController } from './auth/controllers/loginUser.controller';
import { logoutUserController } from './auth/controllers/logoutUser.controller';

export const userController = express.Router();

userController.get('/:id', øAuth, getUserController);
userController.post('/', øAuth, createUserController);
userController.post('/auth/login', loginUserController);
userController.get('/auth/logout', øAuth, logoutUserController);
userController.use(NotFoundError.intercept('[User] '), BadRequestError.intercept('[User]'));

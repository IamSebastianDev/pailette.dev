/** @format */

import express from 'express';
import { createUserController } from './controllers/createUser.controller';
import { getUserController } from './controllers/getUser.controller';
import { BadRequestError, NotFoundError } from '@pai/kzw';
import { loginUserController } from './auth/controllers/loginUser.controller';

export const userController = express.Router();

userController.get('/:id', øAuth, getUserController);
userController.post('/', øAuth, createUserController);
userController.post('/auth/login', loginUserController);
userController.use(NotFoundError.intercept('[User] '), BadRequestError.intercept('[User]'));

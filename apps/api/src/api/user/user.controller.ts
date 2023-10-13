/** @format */

import express from 'express';
import { createUserController } from './controllers/createUser.controller';
import { getUserController } from './controllers/getUser.controller';

export const userController = express.Router();

userController.get('/:id', øAuth, getUserController);
userController.post('/', øAuth, createUserController);

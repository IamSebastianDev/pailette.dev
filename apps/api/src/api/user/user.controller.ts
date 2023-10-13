/** @format */

import express from 'express';
import { createUserController } from './controllers/createUser.controller';

export const userController = express.Router();

userController.post('/', øAuth, createUserController);

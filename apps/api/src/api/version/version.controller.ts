/** @format */

import express from 'express';
import { getVersionController } from './controllers/getVersion.controller';

export const versionController = express.Router();

versionController.get('/', getVersionController);

/** @format */

import express from 'express';
import { getHealthController } from './controllers/getHealth.controller';

export const healthController = express.Router();

healthController.get('/', getHealthController);

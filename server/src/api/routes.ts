/** @format */

import { Router } from 'express';
import { SessionController } from './session/controller/Session.controller';

export const ApiRouter = Router().use('/session', SessionController);

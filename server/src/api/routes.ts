/** @format */

import { Router } from 'express';
import { SessionController } from './session/controller/Session.controller';
import { PromptController } from './prompt/controller/Prompt.controller';

export const ApiRouter = Router().use('/session', SessionController).use('/prompt', PromptController);

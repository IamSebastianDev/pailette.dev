/** @format */

import { Router } from 'express';
import { SessionController } from './session/controller/Session.controller';
import { PromptController } from './prompt/controller/Prompt.controller';
import { handleError } from '../lib/Errors';

export const ApiRouter = Router()
    .use('/session', SessionController)
    .use('/prompt', PromptController)
    .use(handleError());

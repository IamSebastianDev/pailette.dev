/** @format */

import { Router } from 'express';
import { SessionController } from './session/controller/Session.controller';
import { PromptController } from './prompt/controller/Prompt.controller';
import { handleError } from '../lib/Errors';
import { ColourSchemaController } from './schema/controller/colourSchema.controller';
import { HealthController } from './health/controller/Health.controller';

export const ApiRouter = Router()
    .use('/health', HealthController)
    .use('/session', SessionController)
    .use('/prompt', PromptController)
    .use('/schema', ColourSchemaController)
    .use(handleError());

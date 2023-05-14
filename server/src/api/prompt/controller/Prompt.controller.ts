/** @format */

import { Router } from 'express';
import { submitPrompt } from '../service/submitPrompt.service';
import { getPrompt } from '../service/getPrompt.service';
import { handleBadRequest, handleNotFound } from '../../../lib/Errors';

export const PromptController = Router()
    .get('/:session', getPrompt)
    .post('/', submitPrompt)
    .use(handleBadRequest(), handleNotFound());

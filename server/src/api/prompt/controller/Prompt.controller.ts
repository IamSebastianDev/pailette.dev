/** @format */

import { Router } from 'express';
import { submitPrompt } from '../service/submitPrompt.service';
import { handleBadRequest } from '../../../lib/Errors/BadRequestError';
import { handleError } from '../../../lib/Errors/GenericError';

export const PromptController = Router().post('/', submitPrompt).use(handleBadRequest(), handleError());

/** @format */

import { createService } from '../../../lib';
import { BadRequestError } from '../../../lib/Errors/BadRequestError';
import type { Prompt } from '../entity/Prompt.model';
import type { PromptPayload } from '../entity/Prompt.payload';
import { prompts } from '../prompt';

export const submitPrompt = createService<PromptPayload, Prompt>(async (payload) => {
    const result = await prompts.insertOne(payload);

    if (!result) {
        throw new BadRequestError('No value was inserted.');
    }

    return result;
});

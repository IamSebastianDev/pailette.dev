/** @format */

import { createService } from '../../../lib';
import { BadRequestError } from '../../../lib/Errors/BadRequestError';
import type { Prompt } from '../entity/Prompt.model';
import type { PromptPayload } from '../entity/Prompt.payload';
import { prompts } from '../prompt';

export const submitPrompt = createService<PromptPayload, Prompt>(async (payload) => {
    const found = await prompts.findOne({
        where: {
            session: payload.session,
        },
    });

    let result;

    if (found) {
        result = await prompts.updateOneById(found.id, {
            ...payload,
        });
    } else {
        result = await prompts.insertOne(payload);
    }

    if (!result) {
        throw new BadRequestError('No value was inserted.');
    }

    return result;
});

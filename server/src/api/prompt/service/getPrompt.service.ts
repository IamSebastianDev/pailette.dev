/** @format */

import { createService } from '../../../lib';
import { NotFoundError } from '../../../lib/Errors/NotFoundError';
import type { Prompt } from '../entity/Prompt.model';

import { prompts } from '../prompt';

export const getPrompt = createService<{ session: string }, Prompt>(async ({ session }) => {
    const result = await prompts.findOne({ where: { session } });

    if (!result) {
        throw new NotFoundError(`No prompt with the session '${session}' was found.`);
    }

    return result;
});

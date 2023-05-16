/** @format */

import { createService } from '../../../lib';
import { BadRequestError, NotFoundError } from '../../../lib/Errors';
import { retry } from '../../../utils/retry.utils';
import { prompts } from '../../prompt/prompt';
import { colourSchemas } from '../../schema/colourSchema';
import { createPrompt } from '../createPrompt';
import type { Pailette } from '../entity/Pailette.model';
import type { PailettePayload } from '../entity/Pailette.payload';
import { sendPrompt } from '../openAiClient';
import { pailettes } from '../pailette';

export const createPailette = createService<PailettePayload, Pailette>(async ({ format, session }) => {
    if (!format) {
        throw new BadRequestError('No format supplied');
    }

    const prompt = await prompts.findOne({
        where: {
            session,
        },
    });

    const schema = await colourSchemas.findOne({
        where: {
            session,
        },
    });

    if (!prompt || !schema) {
        throw new NotFoundError('Prompt or Schema not found');
    }

    let result: Pailette | false;
    const found = await pailettes.findOne({
        where: {
            session: session,
        },
    });
    const fetched = await retry(async () => {
        const { data } = await sendPrompt(async (client, model, temperature) => {
            return client.createChatCompletion({
                model,
                temperature,
                messages: [...createPrompt(prompt.text, prompt.base, schema.schema, format)],
            });
        });

        return JSON.parse(data.choices[0].message!.content) as Omit<Pailette, 'session'>;
    });

    if (!fetched) {
        throw new BadRequestError('Fetching from Open Ai failed for unknown reasons, maximum retry count exceeded');
    }

    if (found) {
        result = await pailettes.updateOneById(found.id, { ...fetched, session });
    } else {
        result = await pailettes.insertOne({ ...fetched, session });
    }

    if (!result) {
        throw new BadRequestError('No Pailette was inserted');
    }

    return result;
});

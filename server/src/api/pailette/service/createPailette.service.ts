/** @format */

import { createService } from '../../../lib';
import { BadRequestError, NotFoundError } from '../../../lib/Errors';
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

    const { data } = await sendPrompt(async (client, model, temperature) => {
        return client.createChatCompletion({
            model,
            temperature,
            messages: [...createPrompt(prompt.text, prompt.base, schema.schema, format)],
        });
    });

    if (!data) {
        //@todo: retry
    }

    // console.log(JSON.parse(data.choices[0].message!.content));
    const pailette = JSON.parse(data.choices[0].message!.content);
    console.log(pailette);
    const result = await pailettes.insertOne({
        session: session,
        ...pailette,
    });

    if (!result) {
        throw new BadRequestError('No Pailette was inserted');
    }

    return result;
});

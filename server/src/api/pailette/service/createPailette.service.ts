/** @format */

import { createService } from '../../../lib';
import { BadRequestError, NotFoundError } from '../../../lib/Errors';
import { prompts } from '../../prompt/prompt';
import { colourSchemas } from '../../schema/colourSchema';
import { createPrompt } from '../createPrompt';
import type { Pailette } from '../entity/Pailette.model';
import type { PailettePayload } from '../entity/Pailette.payload';
import { sendPrompt, useOpenAiClient } from '../openAiClient';

export const createPailette = createService<PailettePayload, Pailette>(async ({ generator, session }) => {
    if (!generator) {
        throw new BadRequestError('No generator supplied');
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

    const chat = createPrompt(prompt.text, schema.schema, generator);

    const { data } = await sendPrompt(async (client, model, temperature) => {
        return client.createChatCompletion({
            model,
            temperature,
            messages: [...chat],
        });
    });

    if (data) {
        console.log(JSON.parse(data.choices[0].message!.content));
    }

    return {} as Pailette;
});

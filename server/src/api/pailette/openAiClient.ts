/** @format */

import { Configuration, OpenAIApi } from 'openai';
import type { OpenAiAction, OpenAiClientInit } from '../../types';

export const useOpenAiClient = (init: OpenAiClientInit) => {
    const { organization, apiKey, temperature, model } = init;

    if (!organization || !apiKey) {
        throw new Error('No valid authorization properties passed.');
    }

    const config = new Configuration({ organization, apiKey });
    const client = new OpenAIApi(config);
    return async <T>(action: OpenAiAction<T>): Promise<T> => {
        return await action(client, model, temperature);
    };
};

export const sendPrompt = useOpenAiClient({
    organization: process.env.API_ORG!,
    apiKey: process.env.API_KEY!,
    temperature: 0.7,
    model: 'gpt-3.5-turbo',
});

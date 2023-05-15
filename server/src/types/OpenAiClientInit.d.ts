/** @format */

import type { OpenAiModel } from './OpenAiModel';

export type OpenAiClientInit = {
    organization: string;
    apiKey: string;
    temperature: number;
    model: OpenAiModel;
};

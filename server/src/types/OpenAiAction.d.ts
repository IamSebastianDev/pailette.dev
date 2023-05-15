/** @format */

import type { OpenAIApi, Model } from 'openai';
import type { OpenAiModel } from './OpenAiModel';

export type OpenAiAction<T> = (client: OpenAIApi, model: OpenAiModel, temperature?: number) => Promise<T>;

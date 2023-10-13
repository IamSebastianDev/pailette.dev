/** @format */

import '../.config/dotenv.config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { ConfigService } from '@pai/kzw';
import { Environment } from './types/Environment';
import { loq } from './middlewares/loq/loq.middleware';

export const env = new ConfigService<Environment>();
export const app = express().use(
    cors(),
    helmet(),
    compression(),
    express.json(),
    loq({ verbose: true, appName: env.getOrFail('APP_NAME') })
);

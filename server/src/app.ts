/** @format */

import '../../.config/dotenv.config';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import webRoutes from './routes';
import { __root } from './utils/root.util';
import { loq } from './middlewares/loq.middleware';
import cors from 'cors';
import { ApiRouter } from './api/routes';

const { PORT = 3000 } = process.env;
export const app = express();

[
    cors(),
    express.json(),
    helmet({
        contentSecurityPolicy: false,
    }),
    compression(),
    loq(),
].forEach((middleware) => app.use(middleware));

app.use(webRoutes);
app.use('/api/v1', ApiRouter);
app.use(express.static(__root('./client/public')));
app.use('*', (_, res) => res.sendFile(__root('./client/index.html')));

app.listen(PORT, () => console.log(`\x1b[34m\x1b[1m[App]\x1b[0m\x1b[34m started on port ${PORT}\x1b[0m`));

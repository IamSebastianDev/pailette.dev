/** @format */

import express from 'express';
import { healthController } from './health/health.controller';
import { BadRequestError, GenericError, NotAuthorizedError, NotFoundError } from '@pai/kzw';
import { versionController } from './version/version.controller';
import { userController } from './user/user.controller';

export const routes = express
    .Router()
    .use('/health', healthController)
    .use('/version', versionController)
    .use('/user', userController)
    /**
     * Generic / default error handler should always come last
     */
    .use(
        NotFoundError.intercept(),
        BadRequestError.intercept(),
        GenericError.intercept(),
        NotAuthorizedError.intercept()
    );

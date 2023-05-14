/** @format */

import { Router } from 'express';
import { handleBadRequest, handleNotFound } from '../../../lib/Errors';
import { createSchema } from '../service/createSchemas';
import { getSchema } from '../service/getSchema.service';

export const ColourSchemaController = Router()
    .get('/:session', getSchema)
    .post('/', createSchema)
    .use(handleBadRequest(), handleNotFound());

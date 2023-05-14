/** @format */

import { createService } from '../../../lib';
import { BadRequestError } from '../../../lib/Errors';
import { colourSchemas } from '../colourSchema';
import type { ColourSchema } from '../entity/ColourSchema.model';
import type { ColourSchemaPayload } from '../entity/ColourSchema.payload';

export const createSchema = createService<ColourSchemaPayload, ColourSchema>(async (payload) => {
    const found = await colourSchemas.findOne({ where: { session: payload.session } });

    let result;

    if (found) {
        result = await colourSchemas.updateOneById(found.id, { ...payload });
    } else {
        result = await colourSchemas.insertOne(payload);
    }

    if (!result) {
        throw new BadRequestError('No value was inserted.');
    }

    return result;
});

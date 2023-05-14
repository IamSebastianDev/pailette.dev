/** @format */

import { createService } from '../../../lib';
import { NotFoundError } from '../../../lib/Errors/NotFoundError';
import { colourSchemas } from '../colourSchema';
import type { ColourSchema } from '../entity/ColourSchema.model';

export const getSchema = createService<{ session: string }, ColourSchema>(async ({ session }) => {
    const result = await colourSchemas.findOne({ where: { session } });

    if (!result) {
        throw new NotFoundError(`No ColourSchema with the session '${session}' was found.`);
    }

    return result;
});

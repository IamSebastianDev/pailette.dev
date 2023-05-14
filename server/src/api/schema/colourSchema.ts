/** @format */
import { IsArray, IsString, NotNull } from 'flotsamjs/validators';
import { db, type Entity } from '../../db';
import { IsUuid } from '../../lib/dbValidators/isUuid.validator';
import type { ColourSchema } from './entity/ColourSchema.model';

export const colourSchemas = await db.collect<Entity<ColourSchema>>('colourSchemas', {
    validate: {
        schema: [NotNull, IsArray({ min: 1, items: [NotNull, IsString] })],
        session: [NotNull, IsUuid()],
    },
});

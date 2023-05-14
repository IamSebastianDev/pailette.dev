/** @format */
import { IsArray, IsString, NotNull } from 'flotsamjs/validators';
import { db } from '../../db';
import { IsUuid } from '../../lib/dbValidators/isUuid.validator';
import type { ColourSchema } from './entity/ColourSchema.model';
import type { Entity } from '../../types';

export const colourSchemas = await db.collect<Entity<ColourSchema>>('colourSchemas', {
    validate: {
        schema: [NotNull, IsArray({ min: 1, items: [NotNull, IsString] })],
        session: [NotNull, IsUuid()],
    },
});

/** @format */
import { IsString, IsText, NotNull } from 'flotsamjs/validators';
import { db } from '../../db';
import type { Prompt } from './entity/Prompt.model';
import { IsUuid } from '../../lib/dbValidators/isUuid.validator';
import type { Entity } from '../../types';

export const prompts = await db.collect<Entity<Prompt>>('prompts', {
    validate: {
        text: [NotNull, IsText({ min: 30 })],
        session: [NotNull, IsUuid()],
        base: [IsString],
    },
});

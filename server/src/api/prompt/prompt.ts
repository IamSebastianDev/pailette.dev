/** @format */
import { IsText, NotNull } from 'flotsamjs/validators';
import { db, type Entity } from '../../db';
import type { Prompt } from './entity/Prompt.model';
import { IsUuid } from '../../lib/dbValidators/isUuid.validator';

export const prompts = await db.collect<Entity<Prompt>>('prompts', {
    validate: {
        text: [NotNull, IsText({ min: 30 })],
        session: [NotNull, IsUuid()],
    },
});

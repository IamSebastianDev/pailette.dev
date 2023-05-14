/** @format */

import { IsString, NotNull } from 'flotsamjs/validators';
import { db } from '../../db';
import { IsUuid } from '../../lib/dbValidators/isUuid.validator';
import type { Pailette } from './entity/Pailette.model';
import type { Entity } from '../../types';

export const pailettes = await db.collect<Entity<Pailette>>('pailettes', {
    validate: {
        session: [NotNull, IsUuid()],
        output: [NotNull, IsString],
    },
});

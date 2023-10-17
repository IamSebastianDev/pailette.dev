/** @format */

import { NotFoundError, createController } from '@pai/kzw';
import { GetUserPayload } from '../payloads/getUser.payload';
import { getUserById } from '../services/getUserById.service';
import { Request } from 'express';
import { excludeField } from '@pai/prisma';

export const getUserController = createController(async ({ params }: GetUserPayload, req: Request) => {
    const { id } = params;

    const user = await getUserById(id);

    if (!user) {
        throw new NotFoundError(`No user with Id '${id}' found.`);
    }

    return { user: excludeField(user, 'password') };
});

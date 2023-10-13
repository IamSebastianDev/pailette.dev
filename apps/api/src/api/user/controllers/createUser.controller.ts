/** @format */

import { BadRequestError, createController } from '@pai/kzw';
import { CreateUserPayload } from '../payloads/createUser.payload';
import { createUser } from '../services/createUser.service';
import { getUserByEmail } from '../services/getUserByEmail.service';

export const createUserController = createController(async ({ body }: CreateUserPayload, req) => {
    const { name, email, password } = body;

    const exists = !!(await getUserByEmail(email));

    if (exists) {
        throw new BadRequestError('User already exists');
    }

    const user = await createUser({ name, email, password });

    if (!user) {
        throw new BadRequestError('User could not be created.');
    }

    return {
        user,
    };
});

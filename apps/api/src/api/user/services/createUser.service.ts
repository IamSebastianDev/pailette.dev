/** @format */

import { User, client } from '@pai/prisma';
import bcrypt from 'bcrypt';

export const createUser = async (partialUser: Pick<User, 'name' | 'password' | 'email'>) => {
    return client.user.create({
        data: {
            ...partialUser,
            password: bcrypt.hashSync(partialUser.password, 12),
        },
    });
};

/** @format */

import { client } from '@pai/prisma';

export const getUserByEmail = async (email: string) => {
    return client.user.findUnique({
        where: {
            email,
        },
    });
};

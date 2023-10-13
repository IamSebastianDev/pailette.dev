/** @format */

import { client } from '@pai/prisma';

export const getUserById = async (id: string) => {
    return client.user.findUnique({
        where: {
            id,
        },
    });
};

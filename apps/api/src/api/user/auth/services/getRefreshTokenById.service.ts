/** @format */

import { client } from '@pai/prisma';

export const getRefreshTokenById = async (jwtId: string) => {
    return await client.refreshToken.findUnique({
        where: {
            id: jwtId,
        },
    });
};

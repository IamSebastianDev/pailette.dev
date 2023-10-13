/** @format */

import { RefreshToken, client } from '@pai/prisma';

export const revokeRefreshTokenById = async (jwtId: string) => {
    return await client.refreshToken.updateMany({
        where: {
            id: jwtId,
        },
        data: {
            revoked: true,
        },
    });
};

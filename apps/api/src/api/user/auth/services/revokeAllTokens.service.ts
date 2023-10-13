/** @format */

import { User, client } from '@pai/prisma';

export const revokeAllTokens = async (userId: User['id']) => {
    return await client.refreshToken.updateMany({
        where: {
            userId,
        },
        data: {
            revoked: true,
        },
    });
};

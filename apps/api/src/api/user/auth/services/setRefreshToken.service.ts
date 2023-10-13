/** @format */

import { User, client } from '@pai/prisma';
import { hashToken } from '../../../../lib/auth/hashToken';

export const setRefreshToken = async (jwtId: string, refreshToken: string, userId: User['id']) => {
    return await client.refreshToken.create({
        data: {
            id: jwtId,
            userId,
            hashedToken: hashToken(refreshToken),
        },
    });
};

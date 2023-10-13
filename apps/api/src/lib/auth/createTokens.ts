/** @format */

import { createAccessToken } from './createAccessToken';
import { createRefreshToken } from './createRefreshToken';

export const createTokens = async (userId: string, jwtId: string) => {
    return {
        accessToken: await createAccessToken(userId),
        refreshToken: await createRefreshToken(userId, jwtId),
    };
};

/** @format */

import { BadRequestError, NotAuthorizedError, createController } from '@pai/kzw';
import { env } from '../../../../bootstrap';
import { RefreshUserTokenPayload } from '../payloads/refreshUserToken.payload';
import * as jose from 'jose';
import { hashToken } from '../../../../lib/auth/hashToken';
import { getUserById } from '../../services/getUserById.service';
import { getRefreshTokenById } from '../services/getRefreshTokenById.service';
import { revokeRefreshTokenById } from '../services/revokeRefreshTokenById.service';
import { v4 as uuid } from 'uuid';
import { createTokens } from '../../../../lib/auth/createTokens';
import { setRefreshToken } from '../services/setRefreshToken.service';
import { excludeField } from '@pai/prisma';

export const refreshUserTokenController = createController(async ({ body }: RefreshUserTokenPayload) => {
    const secret = new TextEncoder().encode(env.getOrFail('JWT_AUTH_SECRET'));
    const { refreshToken: tokenToValidate } = body;

    if (!tokenToValidate) {
        throw new BadRequestError('No refresh token provided');
    }

    const { payload } = await jose.jwtVerify(tokenToValidate, secret, {});
    if (!payload.jti || !('userId' in payload && typeof payload.userId === 'string')) {
        throw new BadRequestError('Invalid token');
    }

    const user = await getUserById(payload.userId);
    const savedToken = await getRefreshTokenById(payload.jti);
    if (!user || !savedToken || savedToken.revoked === true || hashToken(tokenToValidate) !== savedToken.hashedToken) {
        throw new NotAuthorizedError();
    }

    // Create a new token, invalidate the old one.
    await revokeRefreshTokenById(savedToken.id);

    const jwtId = uuid();
    const { accessToken, refreshToken } = await createTokens(user.id, jwtId);
    await setRefreshToken(jwtId, refreshToken, user.id);

    return {
        user: excludeField(user),
        authorized: {
            time: Date.now(),
            userId: user.id,
        },
        auth: {
            refreshToken,
            accessToken,
        },
    };
});

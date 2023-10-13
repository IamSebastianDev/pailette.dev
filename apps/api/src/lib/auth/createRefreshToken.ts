/** @format */

import { env } from '../../bootstrap';
import * as jose from 'jose';

export const createRefreshToken = async (userId: string, jwtId: string) => {
    const secret = new TextEncoder().encode(env.getOrFail('JWT_AUTH_SECRET'));
    return await new jose.SignJWT({ userId })
        .setIssuedAt()
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('8h')
        .setJti(jwtId)
        .sign(secret);
};

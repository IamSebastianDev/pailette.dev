/** @format */

import { env } from '../../bootstrap';
import * as jose from 'jose';

export const createAccessToken = async (userId: string) => {
    const secret = new TextEncoder().encode(env.getOrFail('JWT_AUTH_SECRET'));
    return await new jose.SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('5m')
        .sign(secret);
};

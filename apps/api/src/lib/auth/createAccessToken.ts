/** @format */

import { env } from '../../bootstrap';
import * as jose from 'jose';

export const createAccessToken = async (userId: string) => {
    const secret = new TextEncoder().encode(env.getOrFail('JWT_AUTH_SECRET'));
    const expires = env.getOrFail('JWT_EXP_TIME');
    console.log({ expires });
    return await new jose.SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(expires)
        .sign(secret);
};

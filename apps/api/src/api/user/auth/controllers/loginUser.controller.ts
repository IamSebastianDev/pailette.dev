/** @format */

import { BadRequestError, NotAuthorizedError, createController } from '@pai/kzw';
import { LoginUserPayload } from '../payloads/loginUser.payload';
import { getUserByEmail } from '../../services/getUserByEmail.service';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { createTokens } from '../../../../lib/auth/createTokens';
import { setRefreshToken } from '../services/setRefreshToken.service';
import { excludeField } from '@pai/prisma';

export const loginUserController = createController(async ({ body }: LoginUserPayload) => {
    const { email, password } = body;

    if (!email || !password) {
        throw new BadRequestError('You must provide an email and password');
    }

    const user = await getUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new NotAuthorizedError('Error during login');
    }

    const jwtId = uuid();
    const { refreshToken, accessToken } = await createTokens(user.id, jwtId);
    await setRefreshToken(jwtId, refreshToken, user.id);

    return {
        user: excludeField(user, 'password'),
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

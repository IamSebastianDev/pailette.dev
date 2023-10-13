/** @format */

import { BadRequestError, NotAuthorizedError } from '@pai/kzw';
import { NextFunction, Request, Response } from 'express';
import { env } from '../../bootstrap';
import { handleAsync } from '@iasd/handle-async';
import * as jose from 'jose';
import { getUserById } from '../../api/user/services/getUserById.service';

export const øAuth = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return next(new NotAuthorizedError());
    }

    // Check and validate the token and `next` a unauthorized error if unsuccessful
    const [, token] = authorization.split(' ');
    const secret = new TextEncoder().encode(env.getOrFail('JWT_AUTH_SECRET'));

    const { result, errorValue } = await handleAsync(async () => {
        return await jose.jwtVerify(token, secret);
    });

    if (
        !result &&
        [jose.errors.JWTClaimValidationFailed, jose.errors.JWTInvalid, jose.errors.JWTExpired].some(
            (err) => errorValue instanceof err
        )
    ) {
        return next(new NotAuthorizedError());
    }

    if (!result) {
        return next(errorValue);
    }

    if (!('userId' in result.payload) || typeof result.payload.userId !== 'string') {
        return next(new BadRequestError('Something went very wrong. This should not be happening.'));
    }

    // Extract the user to construct the locals.loggedInUser payload;
    const user = await getUserById(result.payload.userId);

    res.locals.user = user;
    next();
};

/** @format */

import { validateTokens } from '../../../scripts/tokens/validateTokens';
import { refreshTokens } from '../../auth/refresh.service';
import { sessionService } from '../../session/session.service';

export const authInterceptor = async (request: Request): Promise<Request> => {
    const setRequestHeaders = (token: string) => {
        request.headers.set('Authorization', `Bearer ${token}`);
    };

    // If the url contains a part of the blacklisted request url, the request is returned unaltered
    const blacklist = ['/user/auth/login', '/user/auth/refresh'];
    if (blacklist.some((token) => request.url.includes(token))) {
        return request;
    }

    const { refreshToken, accessToken } = sessionService.getOrFail('auth')?.auth;
    // If one of the tokens is undefined, return the request unaltered.
    if (!refreshToken || !accessToken) {
        return request;
    }
    const valid = await validateTokens(accessToken);

    if (valid) {
        setRequestHeaders(accessToken);
        return request;
    }

    const token = await new Promise<string | null>(async (resolve) => {
        const auth = await refreshTokens({ refreshToken });

        if (!auth) {
            return resolve(auth);
        }

        return resolve(auth.auth.accessToken);
    });

    if (token) {
        setRequestHeaders(token);
    }

    return request;
};

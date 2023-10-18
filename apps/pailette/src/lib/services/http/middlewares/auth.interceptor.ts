/** @format */

import { sessionService } from '../../session/session.service';

export const authInterceptor = (request: Request): Request => {
    // If the url contains a part of the blacklisted request url, the request is returned unaltered
    const blacklist = ['/user/auth/login', '/user/auth/refresh'];
    if (blacklist.some((token) => request.url.includes(token))) {
        return request;
    }

    const tokens = sessionService.getOrFail('auth').auth;
    console.log(tokens);
    return request;
};

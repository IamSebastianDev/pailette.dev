/** @format */

import { assertResponse } from '@pai/core';
import { øAuth } from '../../stores/øauth/øauth.store';
import { httpService } from '../http/http.service';
import { øMe } from '../../stores/øme/øme.store';
import { sessionService } from '../session/session.service';

export const logoutUser = async () => {
    httpService
        .get(`/user/auth/logout`)
        .then(assertResponse)
        .then(() => {
            øAuth.set(null);
            øMe.set(null);
            sessionService.remove('auth');
        });
    return øAuth;
};

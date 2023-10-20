/** @format */

import { assertResponse, tapResponse, type JsonResponse, handleError } from '@pai/core';
import { øMe } from '../../stores/øme/øme.store';
import { httpService } from '../http/http.service';
import type { ØAuth } from '../../stores/øauth/øauth';
import { øAuth } from '../../stores/øauth/øauth.store';
import { sessionService } from '../session/session.service';
import type { RefreshPayload } from './payload/refresh.payload';

export const refreshTokens = async (payload: RefreshPayload) => {
    return await httpService
        .post<JsonResponse<ØAuth>>(`/user/auth/refresh`, { ...payload })
        .then(assertResponse)
        .then(
            tapResponse(({ data }) => {
                øAuth.set(data);
                øMe.set(data.user);
                sessionService.set('auth', data);
            })
        )
        .then(({ data }) => data)
        .catch(handleError());
};

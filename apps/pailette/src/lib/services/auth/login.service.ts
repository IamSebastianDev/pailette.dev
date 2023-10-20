/** @format */

import { assertResponse, handleError, tapResponse, type JsonResponse } from '@pai/core';
import { øMe } from '../../stores/øme/øme.store';
import { httpService } from '../http/http.service';
import type { LoginPayload } from './payload/login.payload';
import type { ØAuth } from '../../stores/øauth/øauth';
import { øAuth } from '../../stores/øauth/øauth.store';
import { sessionService } from '../session/session.service';

export const loginUser = async (payload: LoginPayload) =>
    await httpService
        .post<JsonResponse<ØAuth>>(`/user/auth/login`, { ...payload })
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

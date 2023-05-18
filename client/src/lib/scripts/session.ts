/** @format */

import type { Session } from '../../types';
import { environment } from '../../utils';
import { persistentStorage } from './persistentStorage';
import { request } from './request';

export const session = persistentStorage<Session>('session');
session.connectCallback(({ set }) => {
    request<Session>(`${environment.api_base_url}/session`).then((result) => set(result));
});

/** @format */

import { asyncReadable } from '@iasd/svelte-supercharged-stores';

import { request } from '../scripts/request';
import { environment } from '../../../../shared/environment';
import type { SessionStoreData } from '../../types';

export const session = asyncReadable<SessionStoreData>(async () => {
    return await request<{ session: string }>(`${environment.api_base_url}/session`);
});

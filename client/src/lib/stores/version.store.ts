/** @format */

import { environment } from '../../../../shared/environment';
import type { VersionStoreData } from '../../types';
import { request } from '../scripts/request';
import { asyncReadable } from '@iasd/svelte-supercharged-stores';

export const version = asyncReadable<VersionStoreData, []>(async () => {
    return await request<VersionStoreData>(`${environment.api_base_url}/health`);
});

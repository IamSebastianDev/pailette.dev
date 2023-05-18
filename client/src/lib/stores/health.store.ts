/** @format */

import { writable } from 'svelte/store';
import type { HealthStore } from '../../types';
import { environment } from '../../utils';
import { request } from '../scripts/request';
import { handleAsync } from '@iasd/handle-async';

export const health = writable<HealthStore | undefined>(undefined);
const fetchHealth = async () => {
    const { result, isOk, errorValue } = await handleAsync(async () => {
        return request<HealthStore>(`${environment.api_base_url}/health`);
    });

    if (errorValue) {
        // handle error;
        console.log(errorValue);
    }

    if (isOk() && result) {
        health.set(result);
    }
};

fetchHealth();

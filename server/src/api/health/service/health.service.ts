/** @format */

import { createService } from '../../../lib';

export const health = createService<{}, { ok: boolean }>(async () => {
    const { API_KEY, API_ORG } = process.env;
    const ok = !!API_KEY && !!API_ORG;
    return {
        ok,
    };
});

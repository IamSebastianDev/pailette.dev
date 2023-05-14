/** @format */

import { createService } from '../../../lib';
import { readFile } from 'node:fs/promises';
import { __root } from '../../../utils/root.util';
import type { Health } from '../entity/Health.model';

export const health = createService<{}, Health>(async () => {
    const { API_KEY, API_ORG, APP_NAME, APP_TAG } = process.env;
    const pkg = await readFile(__root('./package.json'), 'utf-8');

    return {
        ok: !!API_KEY && !!API_ORG,
        version: JSON.parse(pkg).version as string,
        application_name: APP_NAME,
        application_tag: APP_TAG,
    };
});

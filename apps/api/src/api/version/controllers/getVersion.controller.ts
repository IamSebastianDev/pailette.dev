/** @format */

import { createController } from '@pai/kzw';
import { getVersion } from '../services/getVersion.service';

export const getVersionController = createController(async (payload) => {
    return await getVersion();
});

/** @format */

import { createController } from '@pai/kzw';
import { getHealth } from '../services/getHealth.service';

export const getHealthController = createController(async (payload) => {
    return await getHealth();
});

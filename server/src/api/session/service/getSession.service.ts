/** @format */

import { v4 as uuid } from 'uuid';
import { createService } from '../../../lib/';

export const getSession = createService<{}, { session: string }>(async () => {
    return {
        session: uuid(),
    };
});

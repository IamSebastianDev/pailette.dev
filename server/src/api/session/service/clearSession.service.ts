/** @format */

import { createService } from '../../../lib';
import type { OkResponse } from '../../../types/';
import { pailettes } from '../../pailette/pailette';
import { prompts } from '../../prompt/prompt';
import { colourSchemas } from '../../schema/colourSchema';

export const clearSession = createService<{ session: string }, OkResponse>(async ({ session }) => {
    // service to clear all session data requested by the user
    await Promise.all(
        [prompts, colourSchemas, pailettes].map(async (adapter) => {
            await adapter.deleteMany({
                where: {
                    session,
                },
            });
        })
    );

    return {
        ok: true,
    };
});

/** @format */

import { createController } from '@pai/kzw';
import { LogoutUserPayload } from '../payloads/logoutUser.payload';
import { revokeAllTokens } from '../services/revokeAllTokens.service';

export const logoutUserController = createController(async ({ locals }: LogoutUserPayload) => {
    const { user } = locals;

    await revokeAllTokens(user.id);

    return {
        ciao: '👋🏻',
    };
});

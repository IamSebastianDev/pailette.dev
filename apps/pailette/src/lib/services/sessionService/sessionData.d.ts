/** @format */

import type { User } from '@pai/prisma';

export type SessionData = {
    authz: {
        user: User;
        access_token: string;
        refresh_token: string;
    };
};

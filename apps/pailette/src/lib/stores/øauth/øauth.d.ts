/** @format */

import type { User } from '@pai/prisma';
import type { ØMe } from '../øme/øme';
export type ØAuth = {
    user: ØMe;
    authorized: {
        time: string;
        userId: string;
    };
    auth: {
        refreshToken: string;
        accessToken: string;
    };
};

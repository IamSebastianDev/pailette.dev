/** @format */

import { Payload } from '@pai/kzw';

export type RefreshUserTokenPayload = Payload<{
    body: { refreshToken: string };
}>;

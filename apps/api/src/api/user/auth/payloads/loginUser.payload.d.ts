/** @format */

import { Payload } from '@pai/kzw';

export type LoginUserPayload = Payload<{
    body: {
        email: string;
        password: string;
    };
}>;

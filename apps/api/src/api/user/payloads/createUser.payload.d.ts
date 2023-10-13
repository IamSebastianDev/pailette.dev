/** @format */

import { Payload } from '@pai/kzw';

export type CreateUserPayload = Payload<{
    body: {
        name: string | null;
        email: string;
        password: string;
    };
}>;

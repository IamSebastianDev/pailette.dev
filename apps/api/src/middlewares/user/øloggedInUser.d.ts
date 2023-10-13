/** @format */

import { Payload } from '@pai/kzw';
import { User } from '@pai/prisma';

export type øLoggedInUser = Payload<{ locals: { user: User } }>;

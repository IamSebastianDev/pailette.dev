/** @format */

import type { User } from '@pai/prisma';

export type ØMe = Omit<User, 'password'> | null;

/** @format */

export * from '@prisma/client';
import { Prisma, PrismaClient } from '@prisma/client';
import { ExtendedUser } from './extends/User.extends';

export const client = new PrismaClient().$extends({
    model: {
        ...ExtendedUser(Prisma.getExtensionContext(this)),
    },
});

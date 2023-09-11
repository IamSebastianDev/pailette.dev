/** @format */

import { User } from '@prisma/client';
import { excludeField } from '../utils/excludeField';

export const ExtendedUser = (client: any) => ({
    user: {
        getByMail: async (email: string) => {
            const user: User = await client.user.findUniqueOrThrow({
                where: {
                    email,
                },
            });

            return excludeField(user, 'password');
        },
        getById: async (id: string) => {
            const user = await client.user.findUniqueOrThrow({
                where: {
                    id,
                },
            });

            return excludeField(user, 'password');
        },
    },
});

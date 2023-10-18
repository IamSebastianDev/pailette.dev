/** @format */

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
const client = new PrismaClient();

await client.user.create({
    data: {
        name: 'Super User',
        email: 'super.user@test.dev',
        password: bcrypt.hashSync('secret', 12),
    },
});

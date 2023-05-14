/** @format */

import { Flotsam } from 'flotsamjs/db';

export const db = new Flotsam({
    root: './.store',
});

await db.connect();

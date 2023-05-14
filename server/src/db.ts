/** @format */

import { Flotsam } from 'flotsamjs/db';

export type Entity<T> = Omit<T, 'id'>;

export const db = new Flotsam({
    root: './.store',
});

await db.connect();

/** @format */

import { payload } from '../core/payload';

export type øNoteDefinitions = {
    [key: string]: ReturnType<typeof payload> | undefined;
};

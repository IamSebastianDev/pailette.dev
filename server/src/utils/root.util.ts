/** @format */

import { resolve, join } from 'node:path';

export const __root = (...fragments: string[]) => resolve(join(process.cwd(), ...fragments));

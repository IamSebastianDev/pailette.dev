import dotenv from 'dotenv';
import { resolve } from 'node:path';

export default dotenv.config({
    path: resolve(process.cwd(), '../../.env'),
});

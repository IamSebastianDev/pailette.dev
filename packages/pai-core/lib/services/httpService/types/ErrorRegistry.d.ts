/** @format */

import type { ErrorHandler } from './ErrorHandler';

export type ErrorRegistry = {
    use: (handler: ErrorHandler) => void;
};

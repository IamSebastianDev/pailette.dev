/** @format */

import type { Ejector } from './Ejector';

export type InterceptorRegistry<Fn> = {
    use: (interceptor: Fn) => Ejector;
    interceptors: Fn[];
};

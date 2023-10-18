/** @format */

import type { RequestInterceptFn } from './RequestInterceptFn';
import type { InterceptorRegistry } from './InterceptorRegistry';
import type { ResponseInterceptFn } from './ResponseInterceptFn';
import type { RequestPayload } from './RequestPayload';
import type { ErrorRegistry } from './ErrorRegistry';

export type HttpService = {
    request: InterceptorRegistry<RequestInterceptFn>;
    response: InterceptorRegistry<ResponseInterceptFn>;
    error: ErrorRegistry;
    fetch: <Response>(resource: string, data?: RequestPayload, init?: RequestInit) => Promise<Response | null>;
    get: <Response>(resource: string, data?: RequestPayload, init?: RequestInit) => Promise<Response | null>;
    post: <Response>(resource: string, data?: RequestPayload, init?: RequestInit) => Promise<Response | null>;
    put: <Response>(resource: string, data?: RequestPayload, init?: RequestInit) => Promise<Response | null>;
    patch: <Response>(resource: string, data?: RequestPayload, init?: RequestInit) => Promise<Response | null>;
    delete: <Response>(resource: string, data?: RequestPayload, init?: RequestInit) => Promise<Response | null>;
};

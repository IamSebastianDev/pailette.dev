/** @format */

import { normalizeRoute } from './core/normalizeRoute';
import type { HttpServiceInit } from './types/HttpServiceInit';
import type { RequestInterceptFn } from './types/RequestInterceptFn';
import type { ResponseInterceptFn } from './types/ResponseInterceptFn';
import type { RequestPayload } from './types/RequestPayload';
import type { HttpService } from './types/HttpService';
import type { ErrorHandler } from './types/ErrorHandler';
import { HttpError } from './core/HttpError.error';

export const createHttpService = (init: Partial<HttpServiceInit>): HttpService => {
    const { baseUrl = '', bodyParser = async (res: Response) => await res.json() } = init;
    const _requestInterceptors: RequestInterceptFn[] = [];
    const _responseInterceptors: ResponseInterceptFn[] = [];
    const _errorHandlers: ErrorHandler[] = [];

    const registerInterceptor = <T extends RequestInterceptFn | ResponseInterceptFn>(interceptor: T, registry: T[]) => {
        registry.push(interceptor);

        return () => {
            const index = registry.findIndex((interceptFn) => interceptFn === interceptor);
            if (index !== -1) {
                registry.splice(index, 1);
            }
        };
    };

    const registerErrorHandler = (handler: ErrorHandler) => {
        _errorHandlers.push(handler);

        return () => {
            const index = _errorHandlers.findIndex((existingHandler) => existingHandler === handler);
            if (index !== -1) {
                _errorHandlers.splice(index, 1);
            }
        };
    };

    const createRequest = (resource: URL, init: RequestInit) => {
        const req = new Request(resource, init);
        return _requestInterceptors.reduce((acc, cur) => cur(acc), req);
    };

    const parseResponse = <Res>(res: Response): Promise<Res> => {
        const intercepted = _responseInterceptors.reduce((acc, cur) => cur(acc), res);
        return bodyParser(intercepted);
    };

    const handleErrors = (err: Error): boolean => {
        return !!_errorHandlers.reduce((acc, cur) => cur(acc), err);
    };

    const { fetch: browserFetch } = window;
    const fetch = async <Res>(resource: string, data: RequestPayload = {}, init?: RequestInit): Promise<Res | null> => {
        const url = new URL(normalizeRoute(baseUrl + resource));
        const { query, ...rest } = data;

        Object.entries(query ?? {}).forEach(([key, param]) => {
            url.searchParams.set(key, param);
        });

        // Methods that should not have a body
        const filterRequestBodyForMethods = ['GET', 'DELETE', 'TRACE', 'OPTIONS', 'HEAD'];
        const requestInit = {
            ...init,
            ...(init && !filterRequestBodyForMethods.includes(init.method ?? 'GET') ? { ...rest } : {}),
        };

        try {
            const request = createRequest(url, { ...init, ...requestInit });
            const res = await browserFetch(request);

            if (!res.ok) {
                throw new HttpError(res.status, res.statusText);
            }

            return parseResponse(res);
        } catch (error: unknown) {
            if (error instanceof Error && handleErrors(error)) {
                return null;
            }
            throw error;
        }
    };

    return {
        error: {
            use: registerErrorHandler,
        },
        request: {
            use: (interceptor: RequestInterceptFn) => {
                return registerInterceptor(interceptor, _requestInterceptors);
            },
            get interceptors() {
                return _requestInterceptors;
            },
        },
        response: {
            use: (interceptor: ResponseInterceptFn) => {
                return registerInterceptor(interceptor, _responseInterceptors);
            },
            get interceptors() {
                return _responseInterceptors;
            },
        },
        fetch,
        get: async <ResponseBody>(resource: string, data: RequestPayload = {}, init: RequestInit = {}) => {
            return await fetch<ResponseBody>(resource, data, { ...init, method: 'GET' });
        },
        post: async <ResponseBody>(resource: string, data: RequestPayload = {}, init: RequestInit = {}) => {
            return await fetch<ResponseBody>(resource, data, { ...init, method: 'POST' });
        },
        put: async <ResponseBody>(resource: string, data: RequestPayload = {}, init: RequestInit = {}) => {
            return await fetch<ResponseBody>(resource, data, { ...init, method: 'PUT' });
        },
        patch: async <ResponseBody>(resource: string, data: RequestPayload = {}, init: RequestInit = {}) => {
            return await fetch<ResponseBody>(resource, data, { ...init, method: 'PATCH' });
        },
        delete: async <ResponseBody>(resource: string, data: RequestPayload = {}, init: RequestInit = {}) => {
            return await fetch<ResponseBody>(resource, data, { ...init, method: 'DELETE' });
        },
    };
};

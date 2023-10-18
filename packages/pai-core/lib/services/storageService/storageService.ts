/** @format */

import { StorageServiceInit } from './types/StorageServiceInit';

export const createStorageService = <T extends Record<string, unknown>>({
    service = 'localStorage',
    namespace,
}: StorageServiceInit) => {
    const _service = window[service];
    const _storageMap = new Map<PropertyKey, unknown>();

    const get = <Token extends keyof T>(token: Token): T[Token] | null => {
        if (!_storageMap.has(token)) {
            const stored = _service.getItem([namespace, token].join('_'));

            if (stored === null) {
                return stored;
            }

            _storageMap.set(token, JSON.parse(stored).data);
        }

        return _storageMap.get(token) as T[Token];
    };

    const getOrFail = <Token extends keyof T>(token: Token): T[Token] => {
        const result = get(token);

        if (!result) {
            throw new Error();
        }

        return result;
    };

    return {
        get,
        getOrFail,
        set: <Token extends keyof T>(token: Token, value: T[Token]) => {
            _service.setItem([namespace, token].join('_'), JSON.stringify({ data: value }));
            _storageMap.set(token, value);
        },
    };
};

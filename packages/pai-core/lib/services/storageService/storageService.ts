/** @format */

import { StorageServiceInit } from './types/StorageServiceInit';

export const storageService = <T extends Map<string, unknown>>({ service = 'localStorage' }: StorageServiceInit) => {
    const _service = window[service];
    const _storageMap = new Map<PropertyKey, unknown>();

    const get = <Token extends keyof T>(token: Token): T[Token] | null => {
        if (!_storageMap.has(token)) {
            const stored = _service.getItem(token.toString());

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
            _service.setItem(token.toString(), JSON.stringify({ data: value }));
            _storageMap.set(token, value);
        },
    };
};

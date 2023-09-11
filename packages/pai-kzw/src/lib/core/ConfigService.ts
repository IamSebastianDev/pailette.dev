/** @format */

import { PrimitiveParser } from '@pai/core';

export class ConfigService<Dict extends Record<PropertyKey, string | number | boolean | null | undefined | BigInt>> {
    parser = new PrimitiveParser();
    get<T extends keyof Dict>(token: T): Dict[T] | undefined {
        const envVar = process.env[token as string];

        if (envVar === undefined) {
            return undefined;
        }

        return this.parser.parse(envVar) as Dict[T];
    }

    getOrFail<T extends keyof Dict>(token: T, error?: string) {
        const envVar = process.env[token as string];

        if (!envVar) {
            throw new Error(error ?? `Could not resolve ${token.toString()}.`);
        }

        return this.parser.parse(envVar) as Dict[T];
    }
}

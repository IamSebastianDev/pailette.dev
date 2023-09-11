/** @format */

export class PrimitiveParser {
    private primitives = new Map([
        ['true', true],
        ['false', false],
        ['null', null],
        ['undefined', undefined],
    ]);

    private isNumeric(str: string): boolean {
        return /^-?\d+(\.\d+)?$/gim.test(str.trim());
    }

    private parseNumber(str: string): null | number | BigInt {
        if (str.includes('.')) {
            return Number(str.trim());
        }

        const bi = BigInt(str.trim());

        if (bi <= BigInt(Number.MAX_SAFE_INTEGER)) {
            return Number(bi);
        }

        return bi;
    }

    private convert(value: string | undefined) {
        if (value === undefined) {
            return value;
        }

        // check if the value is contained in the map
        if (this.primitives.has(value)) {
            return this.primitives.get(value);
        }

        // Check if it is a number, the only case not covered by the map
        if (this.isNumeric(value)) {
            return this.parseNumber(value);
        }

        // if it is not a number, return it as is, the value should be a string
        return value;
    }

    parse<T>(value: string | string[] | undefined): T {
        if (value === undefined) {
            return undefined as T;
        }

        if (Array.isArray(value)) {
            return value.map(this.convert) as T;
        }

        return this.convert(value) as T;
    }
    assert<T>(value: any, assert: (value: any) => boolean): value is T {
        return assert(this.convert(value));
    }
}

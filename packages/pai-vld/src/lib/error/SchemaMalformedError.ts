/** @format */

export class SchemaMalformedError extends Error {
    get message(): string {
        if (!this.errorKey || Object.keys(this.entity).length === 0) {
            return `Error during Schema mapping.`;
        }

        return `Expected to receive a Schema definition object or a valid Validation strategy. Received ${typeof this
            .value} instead`;
    }

    constructor(private value: unknown, private errorKey: string, private entity: Record<PropertyKey, unknown>) {
        super();
    }
}

/** @format */

export class ValidationError extends Error {
    private serialize(entity: Record<PropertyKey, unknown>) {
        try {
            return JSON.stringify(entity);
        } catch {
            return `[Object NonSerializable]`;
        }
    }

    get message(): string {
        if (!this.errorKey || Object.keys(this.entity).length === 0) {
            return `Error during validation.`;
        }

        return `
Validation failed for key [${this.errorKey}] in Object ${this.serialize(this.entity)}.
    
Expected "${this.expectedValue}" -> Received "${this.value}"
    
----{
    ${Object.entries(this.entity)
        .map(([objKey, value]) => `${objKey === this.errorKey ? `-> (ERROR) ${objKey}` : objKey}: ${value}`)
        .join('\n    ')}
----}
`;
    }

    constructor(
        private value: unknown,
        private errorKey: string,
        private entity: Record<PropertyKey, unknown>,
        private expectedValue: string
    ) {
        super();
    }
}

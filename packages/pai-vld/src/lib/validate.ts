/** @format */

import { Schema } from '../types/Schema';
import { SchemaDefinition } from '../types/SchemaDefinition';
import { SchemaMalformedError } from './error/SchemaMalformedError';
import { isRecord } from './isRecord';
import { isSchema } from './isSchema';
import { isValidator } from './isValidator';

export const validate = <S extends SchemaDefinition<any> | Schema<any>>(
    object: Record<PropertyKey, unknown>,
    schema: S
): boolean => {
    const _schema = '_$$' in schema ? (schema as Schema<any>)._$$ : (schema as SchemaDefinition<any>);
    return Object.entries(_schema).every(([propKey, entry]) => {
        if (!entry) {
            return true;
        }

        const val = object[propKey];
        if (isRecord(val) && isSchema(entry)) {
            return validate(val, entry);
        }

        if (isValidator(entry) || (Array.isArray(entry) && entry.every((v) => isValidator(v)))) {
            return [entry].flat().every((validator) => validator(val, propKey, object));
        }

        throw new SchemaMalformedError(val, propKey, object);
    });
};

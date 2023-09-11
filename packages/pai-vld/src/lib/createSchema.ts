/** @format */

import { Schema } from '../types/Schema';
import { SchemaDefinition } from '../types/SchemaDefinition';
import { ValidationError } from './error/ValidationError';
import { validate } from './validate';

export const createSchema = <Entity extends Record<PropertyKey, unknown>>(
    schema: SchemaDefinition<Entity>
): Schema<Entity> => {
    const createdSchema = Object.assign(
        {},
        {
            _$$: schema,
            validate: (object: Entity) => {
                try {
                    return validate(object, schema);
                } catch (error) {
                    if (error instanceof ValidationError) {
                        return false;
                    }

                    throw error;
                }
            },
            validateOrThrow: (object: Entity) => {
                return validate(object, schema);
            },
            validateProperty: (key: keyof Entity, value: unknown) => {
                return validate({ [key]: value }, schema);
            },
        }
    );
    ///@ts-expect-error
    Object.defineProperty(createdSchema.__proto__, 'isSchema', {
        value: true,
        enumerable: false,
    });

    return createdSchema;
};

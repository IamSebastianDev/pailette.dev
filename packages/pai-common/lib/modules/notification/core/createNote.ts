/** @format */

import { Payload } from '../types/Payload';
import { øNote } from '../types/øNote';

export const createNote = <N extends string, P extends Record<PropertyKey, unknown> = {}>(type: N, payloadType?: Payload<P>) => {
    if (payloadType) {
        return (payload: P) => ({
            type,
            ...payload,
        });
    } else {
        return () => ({ type });
    }
};

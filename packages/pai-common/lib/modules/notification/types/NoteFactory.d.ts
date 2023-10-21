/** @format */

import { Payload } from './Payload';
import { øNote } from './øNote';
import { øNoteDefinitions } from './øNoteDefinition';

export type NoteFactory<Defs extends øNoteDefinitions> = {
    [K in keyof Defs & string]: Defs[K] extends Payload<infer P> ? (payload: P) => øNote<K, P> : () => øNote<K, {}>;
};

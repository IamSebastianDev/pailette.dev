/** @format */

import { NoteFactory } from '../types/NoteFactory';
import { øNoteDefinitions } from '../types/øNoteDefinition';
import { createNote } from './createNote';

export const noteFactory = <Notes extends øNoteDefinitions>(notes: Notes): NoteFactory<Notes> => {
    const noteFunctions: any = {};

    for (const key in notes) {
        noteFunctions[key] = createNote(key, notes[key]);
    }

    return noteFunctions;
};

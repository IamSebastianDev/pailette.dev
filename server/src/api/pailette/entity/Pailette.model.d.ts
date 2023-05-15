/** @format */

import type { PailetteColor } from './PailetteColor.model';

export type Pailette = {
    id: string;
    session: string;
    colors: PailetteColor[];
    output: string;
};

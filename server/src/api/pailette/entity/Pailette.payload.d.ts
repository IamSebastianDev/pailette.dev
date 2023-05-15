/** @format */

import type { PailetteGenerator } from './PailetteGenerator';

export type PailettePayload = {
    generator: PailetteGenerator;
    session: string;
};

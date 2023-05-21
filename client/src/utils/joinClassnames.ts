/** @format */

import { isNonNull } from '../../../shared/utils/isNonNull.util';

export const joinClassNames = (...strings: (string | null)[]): string => strings.filter(isNonNull).join(' ');

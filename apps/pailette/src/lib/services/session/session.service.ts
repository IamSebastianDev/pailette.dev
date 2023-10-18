/** @format */

import { createStorageService } from '@pai/core';
import type { ØAuth } from '../../stores/øauth/øauth';

export const sessionService = createStorageService<{ auth: ØAuth }>({ service: 'sessionStorage', namespace: 'pai' });

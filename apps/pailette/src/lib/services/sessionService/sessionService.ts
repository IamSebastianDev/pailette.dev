/** @format */

import { createStorageService } from '@pai/core';
import type { SessionData } from './sessionData';

export const sessionService = createStorageService<SessionData>({ service: 'sessionStorage' });

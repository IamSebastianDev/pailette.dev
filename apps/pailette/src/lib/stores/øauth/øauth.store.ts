/** @format */

import { writable } from 'svelte/store';
import type { ØAuth } from './øauth';

export const øAuth = writable<ØAuth | null>(null);

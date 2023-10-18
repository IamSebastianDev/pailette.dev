/** @format */

import { writable } from 'svelte/store';
import type { ØMe } from './øme';

export const øMe = writable<ØMe>(null);

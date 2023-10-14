/** @format */
import { isNotEmpty } from '@pai/core';

export const normalizeRoute = (route: string) => route.split('/').filter(isNotEmpty).join('/');

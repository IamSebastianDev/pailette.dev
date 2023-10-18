/** @format */
import { createHttpService } from '@pai/core';
import { authInterceptor } from './middlewares/auth.interceptor';
import { customHeaderSet } from './middlewares/customHeaders.interceptor';

export const httpService = createHttpService({ baseUrl: 'http://localhost:3000/api/v1' });
httpService.request.use(authInterceptor);
httpService.request.use(customHeaderSet);

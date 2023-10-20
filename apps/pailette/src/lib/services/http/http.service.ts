/** @format */
import { createHttpService } from '@pai/core';
import { authInterceptor } from './middlewares/auth.interceptor';
import { customHeaderSet } from './middlewares/customHeaders.interceptor';
import { environment } from '../../../environment';
import { requestLogger } from './middlewares/requestLogger.interceptor';

export const httpService = createHttpService({ baseUrl: environment.api_base_url });
httpService.request.use(authInterceptor);
httpService.request.use(customHeaderSet);
httpService.request.use(requestLogger);

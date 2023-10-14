/** @format */
import { httpService } from '@pai/core';

export const apiService = httpService({ baseUrl: 'http://localhost:3000/api/v1' });
apiService.request.use((req) => {
    return req;
});

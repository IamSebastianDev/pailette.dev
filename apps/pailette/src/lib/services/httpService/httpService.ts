/** @format */
import { createHttpService } from '@pai/core';

export const apiService = createHttpService({ baseUrl: 'http://localhost:3000/api/v1' });
apiService.request.use((req) => {
    return req;
});

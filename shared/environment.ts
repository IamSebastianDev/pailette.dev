/** @format */

import { assertEnvironment } from './utils/assertEnvironment.util';
export type Environment = 'development' | 'production';
export const environment = {
    api_base_url: 'http://localhost:3000/api/v1',
    get current(): 'development' | 'production' {
        let environment: Environment = 'development';

        if (assertEnvironment()) {
            if (window && (window as any).environment) {
                environment = (window as any).environment as Environment;
            }
        } else {
            if (process.env.NODE_ENV) {
                environment = process.env.NODE_ENV as Environment;
            }
        }

        return environment;
    },
};

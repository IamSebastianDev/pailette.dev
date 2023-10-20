/** @format */

export type Environment = {
    PORT: number;
    DB_NAME: string;
    DB_PORT: number;
    DB_AUTH: string;
    DB_USER: string;
    DB_CONNECT: string;
    APP_NAME: string;
    APP_TAG: string;
    EMAIL_USER: string;
    EMAIL_AUTH: string;
    EMAIL_HOST: string;
    EMAIL_PORT: string;
    VERBOSE: boolean;
    JWT_AUTH_SECRET: string;
    JWT_EXP_TIME: string;
};

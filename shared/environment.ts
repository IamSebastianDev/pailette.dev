/** @format */

export const environment = {
    get current() {
        return process.env.NODE_ENV;
    },
    isDevelopment: () => {
        return process.env.NODE_ENV !== 'production';
    },
    isProduction: () => {
        return process.env.NODE_ENV === 'production';
    },
};

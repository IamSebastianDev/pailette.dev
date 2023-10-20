/** @format */

export const requestLogger = async (request: Request) => {
    console.log({ request });
    return request;
};

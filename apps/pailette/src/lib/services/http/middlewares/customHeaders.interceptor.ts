/** @format */

export const customHeaderSet = async (req: Request): Promise<Request> => {
    req.headers.set('o-pai', '');
    return req;
};

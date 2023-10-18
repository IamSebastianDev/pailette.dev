/** @format */

export const customHeaderSet = (req: Request): Request => {
    req.headers.set('o-pai', '');
    return req;
};

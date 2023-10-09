/** @format */

export type HttpServiceInit = {
    baseUrl: string;
    bodyParser: <R>(res: Response) => Promise<R>;
};

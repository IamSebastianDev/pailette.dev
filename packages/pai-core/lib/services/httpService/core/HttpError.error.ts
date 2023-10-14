/** @format */

export class HttpError extends Error {
    constructor(private status: Response['status'], private text: Response['statusText']) {
        super();
    }

    get message() {
        return `HTTP-Error: ${this.status} - ${this.text}`;
    }
}

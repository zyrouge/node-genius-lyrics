import { errors } from "../helpers/http";

export class UnexpectedResponseError extends Error {
    error: errors.ResponseStatusCodeError;

    constructor(error: errors.ResponseStatusCodeError) {
        super(`Returned ${error.statusCode} with message: ${error}`);
        this.error = error;
    }
}

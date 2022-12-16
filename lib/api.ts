import { request, errors, MethodlessRequestOptions } from "./helpers/http";
import {
    InvalidGeniusKeyError,
    NoResultError,
    UnexpectedResponseError,
} from "./errors";

export class ApiClient {
    constructor(
        public readonly url: string,
        public readonly options?: MethodlessRequestOptions
    ) {}

    async get(
        route: string,
        headers?: Record<string, string>
    ): Promise<string> {
        try {
            const { body } = await request(`${this.url}${route}`, {
                ...this.options,
                headers: {
                    ...headers,
                    ...this.options?.headers,
                },
                throwOnError: true,
            });

            return body.text();
        } catch (err: unknown) {
            throw this._handleError(err);
        }
    }

    _handleError(error: unknown) {
        if (error instanceof errors.ResponseStatusCodeError) {
            switch (error.statusCode) {
                case 401:
                    return new InvalidGeniusKeyError();

                case 404:
                    return new NoResultError();

                default:
                    return new UnexpectedResponseError(error);
            }
        }

        return error;
    }
}

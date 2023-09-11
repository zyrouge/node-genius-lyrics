import { request, errors, MethodlessRequestOptions } from "./helpers/http";
import {
    InvalidGeniusKeyError,
    NoResultError,
    UnexpectedResponseError,
} from "./errors";

export class RequestClient {
    constructor(
        public readonly base?: string,
        public readonly options?: MethodlessRequestOptions
    ) {}

    async get(
        route: string,
        options?: MethodlessRequestOptions
    ): Promise<string> {
        const url = this.base ? `${this.base}${route}` : route;
        try {
            const { body } = await request(url, {
                ...this.options,
                ...options,
                headers: {
                    ...options?.headers,
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

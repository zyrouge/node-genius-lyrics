import { request, errors, MethodlessRequestOptions } from "./helpers/http";
import {
    InvalidGeniusKeyError,
    NoResultError,
    WithMessageError,
} from "./errors";

/**
 * Refer [got.Options](https://www.npmjs.com/package/got) for documentation of `OptionsOfTextResponseBody`.
 */
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
            });

            return body.text();
        } catch (err: unknown) {
            throw this._handleError(err);
        }
    }

    _handleError(err: unknown) {
        if (err instanceof errors.ResponseStatusCodeError) {
            switch (err.statusCode) {
                case 401:
                    return new InvalidGeniusKeyError();

                case 404:
                    return new NoResultError();

                default:
                    return new WithMessageError(
                        err.statusCode,
                        err.message ?? "-"
                    );
            }
        }

        return err;
    }
}

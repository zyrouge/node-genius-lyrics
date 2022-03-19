import got, { OptionsOfTextResponseBody, RequestError } from "got";
import {
    InvalidGeniusKeyError,
    NoResultError,
    WithMessageError,
} from "../errors";

/**
 * Refer [got.Options](https://www.npmjs.com/package/got) for documentation of `OptionsOfTextResponseBody`.
 */
export class Requester {
    constructor(
        public readonly url: string,
        public readonly options: OptionsOfTextResponseBody
    ) {}

    async get(route: string, headers?: Record<string, string>) {
        try {
            const { body } = await got.get(`${this.url}${route}`, {
                ...this.options,
                headers: {
                    ...headers,
                    ...this.options?.headers,
                },
            });

            return body;
        } catch (err: unknown) {
            throw this._handleError(err);
        }
    }

    _handleError(err: unknown) {
        if (err instanceof RequestError) {
            if (err.response) {
                switch (err.response.statusCode) {
                    case 401:
                        return new InvalidGeniusKeyError();

                    case 404:
                        return new NoResultError();

                    default:
                        return new WithMessageError(
                            err.response.statusCode,
                            err.response.statusMessage ?? "-"
                        );
                }
            }
        }

        return err;
    }
}

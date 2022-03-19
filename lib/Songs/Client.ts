import got from "got";
import { Client } from "../";
import { Song } from "./song";
import { Constants } from "../helpers/constants";
import {
    InvalidTypeError,
    NoResultError,
    RequiresGeniusKeyError,
} from "../errors";
import { isNumber, isString } from "../helpers/types";

export interface SongSearchOptions {
    sanitizeQuery: boolean;
}

export class SongsClient {
    /**
     * @example const SongsClient = new Genius.Songs.Client(key);
     */
    constructor(public readonly client: Client) {}

    /**
     * Searches for songs for the provided query (Key is optional)
     * @example const SearchResults = await SongsClient.search("faded");
     */
    async search(query: string, options?: Partial<SongSearchOptions>) {
        if (!isString(query)) {
            throw new InvalidTypeError("query", "string", typeof query);
        }

        const nOptions: SongSearchOptions = {
            sanitizeQuery: options?.sanitizeQuery ?? true,
        };

        const encodedQuery = encodeURIComponent(
            nOptions.sanitizeQuery ? this.sanitizeQuery(query) : query
        );

        let result: any[] = [];
        if (isString(this.client.key)) {
            const data = await this.client.api.get(`/search?q=${encodedQuery}`);
            const parsed = JSON.parse(data);

            result = parsed.response.hits;
        } else {
            const res = await got.get(
                `${
                    this.client.config.origin?.url || Constants.unofficialApiURL
                }/search/multi?per_page=5&q=${encodedQuery}`,
                {
                    ...this.client.config.requestOptions,
                    headers: {
                        "User-Agent": Constants.defaultUserAgent,
                        ...this.client.config.requestOptions?.headers,
                    },
                }
            );
            const parsed = JSON.parse(res.body);

            if (!parsed?.response?.sections) {
                throw new NoResultError();
            }

            const __hits = parsed.response.sections.find(
                (s: any) => s.type === "song"
            );
            if (!__hits?.hits?.length) {
                throw new NoResultError();
            }

            result = __hits.hits;
        }

        return result
            .filter((s) => s.type === "song")
            .map((s) => new Song(this.client, s.result, true));
    }

    /**
     * Fetches the Song using the provided ID (Requires Key)
     * @example const Song = await SongsClient.get(3276244);
     */
    async get(id: number) {
        if (!isString(this.client.key)) {
            throw new RequiresGeniusKeyError();
        }

        if (!isNumber(id)) {
            throw new InvalidTypeError("id", "number", typeof id);
        }

        const data = await this.client.api.get(`/songs/${id}`);
        const parsed = JSON.parse(data);

        return new Song(this.client, parsed.response.song, false);
    }

    // Source: https://github.com/farshed/genius-lyrics-api/blob/110397a9f05fe20c4ded92418430f665f074c4e4/lib/utils/index.js#L15
    sanitizeQuery(query: string) {
        return query
            .toLowerCase()
            .replace(/ *\([^)]*\) */g, "")
            .replace(/ *\[[^\]]*]/, "")
            .replace(/feat.|ft./g, "")
            .replace(/\s+/g, " ")
            .trim();
    }
}

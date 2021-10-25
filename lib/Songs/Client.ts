import got from "got";
import { Client } from "../";
import { Song } from "./Song";
import { Constants } from "../Constants";

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
        const { sanitizeQuery }: SongSearchOptions = {
            sanitizeQuery: true,
            ...options,
        };

        if (typeof query !== "string") {
            throw new Error("'query' must be a type of 'string'");
        }

        const term = encodeURIComponent(
            sanitizeQuery ? this.sanitizeQuery(query) : query
        );
        let result: any[] = [];
        if (this.client.key) {
            const data = await this.client.api.get(`/search?q=${term}`);
            const parsed = JSON.parse(data);

            result = parsed.response.hits;
        } else {
            const res = await got.get(
                `${
                    this.client.config.origin?.url || Constants.UN_BASE_URL
                }/search/multi?per_page=5&q=${term}`,
                {
                    ...this.client.config.requestOptions,
                    headers: {
                        "User-Agent": Constants.DEF_USER_AGENT,
                        ...this.client.config.requestOptions?.headers,
                    },
                }
            );
            const parsed = JSON.parse(res.body);

            if (!parsed?.response?.sections) {
                throw new Error(Constants.NO_RESULT);
            }

            const __hits = parsed.response.sections.find(
                (s: any) => s.type === "song"
            );
            if (!__hits?.hits?.length) {
                throw new Error(Constants.NO_RESULT);
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
        if (typeof id !== "number") {
            throw new Error("'id' must be a type of 'number'");
        }

        if (!this.client.key) {
            throw new Error(Constants.REQUIRES_KEY);
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

import got from "got";
import { Client } from "../";
import { Song } from "./Song";
import { Constants } from "../Constants";

export class SongsClient {
    /**
     * @example const SongsClient = new Genius.Songs.Client(key);
     */
    constructor(public readonly client: Client) {}

    /**
     * Searches for songs for the provided query (Key is optional)
     * @example const SearchResults = await SongsClient.search("faded");
     */
    async search(q: string) {
        if (typeof q !== "string") {
            throw new Error("Query must be an string");
        }

        const term = encodeURIComponent(q);
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
    async get(q: number) {
        if (!q || typeof q !== "number") {
            throw new Error("Invalid Song ID");
        }

        if (!this.client.key) {
            throw new Error(Constants.REQUIRES_KEY);
        }

        const data = await this.client.api.get(`/songs/${q}`);
        const parsed = JSON.parse(data);

        return new Song(this.client, parsed.response.song, false);
    }
}

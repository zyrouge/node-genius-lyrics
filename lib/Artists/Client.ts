import { Client } from "../Client";
import { Artist } from "./Artist";
import { Constants } from "../Constants";

export class ArtistsClient {
    /**
     * @example const ArtistsClient = await Genius.Artist.Client(key);
     */
    constructor(public readonly client: Client) {}

    /**
     * Fetches the Artist using the provided ID (Requires Key)
     * @example const Artist = await ArtistsClient.get(456537);
     */
    async get(id: number) {
        if (typeof id !== "number") {
            throw new Error("'id' must be a type of 'number'");
        }

        if (!this.client.key) {
            throw new Error(Constants.REQUIRES_KEY);
        }

        const data = await this.client.api.get(`/artists/${id}`);
        const parsed = JSON.parse(data);

        return new Artist(this.client, parsed.response.artist, false);
    }
}

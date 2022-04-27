import { Client } from "../client";
import { Artist } from "./artist";
import { InvalidTypeError, RequiresGeniusKeyError } from "../errors";
import { isNumber, isString } from "../helpers/types";

export class ArtistsClient {
    /**
     * @example const ArtistsClient = await Genius.Artist.Client(key);
     */
    constructor(public readonly client: Client) {}

    /**
     * Fetches the Artist using the provided ID (Requires Key)
     * @example const Artist = await ArtistsClient.get(456537);
     */
    async get(id: number): Promise<Artist> {
        if (!isString(this.client.key)) {
            throw new RequiresGeniusKeyError();
        }

        if (!isNumber(id)) {
            throw new InvalidTypeError("id", "number", typeof id);
        }

        const data = await this.client.api.get(`/artists/${id}`);
        const parsed = JSON.parse(data);

        return new Artist(this.client, parsed.response.artist, false);
    }
}

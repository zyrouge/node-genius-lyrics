import Artist from "./Artist";
import { Config } from "../Constants";
export default class ArtistsClient {
    private key?;
    private config;
    /**
     * @example const ArtistsClient = await Genius.Artist.Client(key);
     */
    constructor(key?: string, config?: Config);
    /**
     * Fetches the Artist using the provided ID (Requires Key)
     * @example const Artist = await ArtistsClient.get(456537);
     */
    get(q: number): Promise<Artist>;
}

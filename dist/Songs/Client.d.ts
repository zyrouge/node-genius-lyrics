import Song from "./Song";
import { Config } from "../Constants";
export default class SongsClient {
    private key?;
    private config;
    /**
     * @example const SongsClient = new Genius.Songs.Client(key);
     */
    constructor(key?: string, config?: Config);
    /**
     * Searches for songs for the provided query (Key is optional)
     * @example const SearchResults = await SongsClient.search("faded");
     */
    search(q: string): Promise<Song[]>;
    /**
     * Fetches the Song using the provided ID (Requires Key)
     * @example const Song = await SongsClient.get(3276244);
     */
    get(q: number): Promise<Song>;
}

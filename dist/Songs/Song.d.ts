import Album from "../Albums/Album";
import Artist from "../Artists/Artist";
import { Config } from "../Constants";
export default class Song {
    title: string;
    fullTitle: string;
    featuredTitle: string;
    id: number;
    thumbnail: string;
    image: string;
    url: string;
    endpoint: string;
    artist: Artist;
    partial: boolean;
    album?: Album;
    releasedAt?: Date;
    raw: any;
    private key?;
    private config;
    constructor(res: any, key?: string, partial?: boolean, config?: Config);
    /**
     * Fetches Lyrics of the Track
     * @example const Lyrics = await Song.lyrics(true);
     */
    lyrics(removeChorus?: boolean): Promise<string>;
    /**
     * Fetches All Information about the Track and updates all the existing Properties (Requires Key)
     * @example const NewSong = await Song.fetch();
     */
    fetch(): Promise<this>;
}

import { Config } from "../Constants";
export default class Artist {
    name: string;
    id: number;
    url: string;
    thumbnail: string;
    image: string;
    iq: number;
    verified: {
        normal: boolean;
        meme: boolean;
    };
    partial: boolean;
    socialmedia: {
        facebook?: string;
        twitter?: string;
    };
    raw: any;
    private key?;
    private config;
    constructor(res: any, key?: string, partial?: boolean, config?: Config);
    /**
     * Fetches the songs of the Artist (Requires Key)
     * @example const Songs = await Artist.songs();
     */
    songs(options?: {
        sort?: string;
        page?: number;
        per_page?: number;
    }): Promise<any>;
    /**
     * Fetches All Information about the Artist and updates all the existing Properties (Requires Key)
     * @example const NewArtist = await Artist.fetch();
     */
    fetch(): Promise<Artist>;
}

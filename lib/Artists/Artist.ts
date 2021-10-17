import { Client } from "../Client";
import { Song } from "../Songs/Song";
import { Constants } from "../Constants";

export class Artist {
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
    socialmedia: {
        facebook?: string;
        twitter?: string;
    };
    raw: any;

    constructor(
        public readonly client: Client,
        res: any,
        public partial: boolean = false
    ) {
        this.name = res.name;
        this.id = +res.id;
        this.url = res.url;
        this.thumbnail = res.image_url;
        this.image = res.header_image_url;
        this.iq = +res.iq ?? 0;
        this.verified = {
            normal: res.is_verified,
            meme: res.is_meme_verified,
        };
        this.socialmedia = {
            facebook: res.facebook_name || undefined,
            twitter: res.twitter_name || undefined,
        };
        this.raw = res;
    }

    /**
     * Fetches the songs of the Artist (Requires Key)
     * @example const Songs = await Artist.songs();
     */
    async songs(
        options: {
            sort?: string;
            page?: number;
            per_page?: number;
        } = {}
    ) {
        if (!this.client.key) {
            throw new Error(Constants.REQUIRES_KEY);
        }

        if (typeof options !== "object") {
            throw new Error("Options must be an object");
        }

        const per_page = options.per_page ?? 20;
        const sort =
            options.sort && Constants.ARTIST_SORTS.includes(options.sort)
                ? options.sort
                : "title";
        const page = options.page ?? 1;

        const data = await this.client.api.get(
            `/songs?page=${page}&per_page=${per_page}&sort=${sort}`
        );
        const parsed = JSON.parse(data);

        return parsed.songs.map((s: any) => new Song(this.client, s, true));
    }

    /**
     * Fetches All Information about the Artist and updates all the existing Properties (Requires Key)
     * @example const NewArtist = await Artist.fetch();
     */
    async fetch() {
        if (!this.client.key) {
            throw new Error(Constants.REQUIRES_KEY);
        }

        const data = await this.client.api.get(`/artists/${this.id}`);
        const parsed = JSON.parse(data);

        this.socialmedia.facebook = parsed.artist.facebook_name;
        this.socialmedia.twitter = parsed.artist.twitter_name;
        this.raw = parsed.artist;
        this.partial = false;

        return new Artist(this.client, parsed.artist, false);
    }
}

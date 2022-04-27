import { Client } from "../client";
import { Song } from "../songs/song";
import { InvalidTypeError, RequiresGeniusKeyError } from "../errors";
import {
    isNumber,
    isObject,
    isString,
    isUndefined,
    joinTypes,
} from "../helpers/types";

export const ArtistSorts = ["title", "popularity"] as const;
export type IArtistSorts = typeof ArtistSorts[number];

export interface IArtistGetSongsOptions {
    sort: IArtistSorts;
    page: number;
    perPage: number;
}

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
    _raw: any;

    constructor(
        public readonly client: Client,
        res: any,
        public partial: boolean = false
    ) {
        this.name = res.name;
        this.id = parseInt(res.id);
        this.url = res.url;
        this.thumbnail = res.image_url;
        this.image = res.header_image_url;
        this.iq = parseInt(res.iq) ?? 0;
        this.verified = {
            normal: res.is_verified,
            meme: res.is_meme_verified,
        };
        this.socialmedia = {
            facebook: res.facebook_name ?? undefined,
            twitter: res.twitter_name ?? undefined,
        };
        this._raw = res;
    }

    /**
     * Fetches the songs of the Artist (Requires Key)
     * @example const Songs = await Artist.songs();
     */
    async songs(
        options: Partial<IArtistGetSongsOptions> = {}
    ): Promise<Song[]> {
        if (!isString(this.client.key)) {
            throw new RequiresGeniusKeyError();
        }

        if (!isObject(options)) {
            throw new InvalidTypeError("options", "object", typeof options);
        }

        if (!isUndefined(options.sort) && !ArtistSorts.includes(options.sort)) {
            throw new InvalidTypeError(
                "options.sort",
                joinTypes(...ArtistSorts),
                typeof options.sort
            );
        }

        if (!isUndefined(options.page) && !isNumber(options.page)) {
            throw new InvalidTypeError(
                "options.page",
                joinTypes("number", "undefined"),
                typeof options.page
            );
        }

        if (!isUndefined(options.page) && !isNumber(options.page)) {
            throw new InvalidTypeError(
                "options.perPage",
                joinTypes("number", "undefined"),
                typeof options.perPage
            );
        }

        const nOptions: IArtistGetSongsOptions = {
            sort: options.sort ?? "title",
            page: options.page ?? 1,
            perPage: options.perPage ?? 20,
        };

        const data = await this.client.api.get(
            `/artists/${this.id}/songs?page=${nOptions.page}&per_page=${nOptions.perPage}&sort=${nOptions.sort}`
        );
        const parsed = JSON.parse(data);

        return parsed.response.songs.map(
            (s: any) => new Song(this.client, s, true)
        );
    }

    /**
     * Fetches All Information about the Artist and updates all the existing Properties (Requires Key)
     * @example const NewArtist = await Artist.fetch();
     */
    async fetch(): Promise<Artist> {
        if (!isString(this.client.key)) {
            throw new RequiresGeniusKeyError();
        }

        const data = await this.client.api.get(`/artists/${this.id}`);
        const parsed = JSON.parse(data);

        this.socialmedia.facebook = parsed.artist.facebook_name;
        this.socialmedia.twitter = parsed.artist.twitter_name;
        this._raw = parsed.artist;
        this.partial = false;

        return new Artist(this.client, parsed.artist, false);
    }
}

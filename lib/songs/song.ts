import { request } from "../helpers/http";
import * as cheerio from "cheerio";
import { Client } from "../client";
import { Album } from "../albums/album";
import { Artist } from "../artists/artist";
import { Constants } from "../helpers/constants";
import {
    InvalidTypeError,
    NoResultError,
    RequiresGeniusKeyError,
} from "../errors";
import { isBoolean, isString } from "../helpers/types";

export class Song {
    title: string;
    fullTitle: string;
    featuredTitle: string;
    id: number;
    thumbnail: string;
    image: string;
    url: string;
    endpoint: string;
    artist: Artist;
    album?: Album;
    releasedAt?: Date;
    instrumental: boolean;
    _raw: any;

    constructor(
        public readonly client: Client,
        res: any,
        public partial: boolean = false
    ) {
        this.title = res.title;
        this.fullTitle = res.full_title;
        this.featuredTitle = res.title_with_featured;
        this.id = parseInt(res.id);
        this.thumbnail = res.header_image_thumbnail_url;
        this.image = res.header_image_url;
        this.url = res.url;
        this.endpoint = res.api_path;
        this.artist = new Artist(this.client, res.primary_artist, true);
        this.partial = partial;
        this.album =
            !this.partial && res.album
                ? new Album(res.album, this.artist)
                : undefined;
        this.releasedAt =
            !this.partial && res.release_date
                ? new Date(res.release_date)
                : undefined;
        this.instrumental = res.instrumental;
        this._raw = res;
    }

    /**
     * Fetches Lyrics of the Track
     * @example const Lyrics = await Song.lyrics(true);
     */
    async lyrics(removeChorus: boolean = false): Promise<string> {
        if (!isBoolean(removeChorus)) {
            throw new InvalidTypeError(
                "removeChorus",
                "boolean",
                typeof removeChorus
            );
        }

        const { body } = await request(this.url, {
            ...this.client.config.requestOptions,
            headers: {
                "User-Agent": Constants.defaultUserAgent,
                ...this.client.config.requestOptions?.headers,
            },
        });

        const $ = cheerio.load(await body.text());

        const selectors: (() => string | undefined)[] = [
            () => $(".lyrics").text().trim(),
            () =>
                $("div[class*='Lyrics__Container']")
                    .toArray()
                    .map((x) => {
                        const ele = $(x as any);
                        ele.find("br").replaceWith("\n");
                        return ele.text();
                    })
                    .join("\n")
                    .trim(),
        ];

        for (const x of selectors) {
            const lyrics = x();
            if (lyrics?.length) {
                return removeChorus ? this.removeChorus(lyrics) : lyrics;
            }
        }

        throw new NoResultError();
    }

    /**
     * Fetches All Information about the Track and updates all the existing Properties (Requires Key)
     * @example const NewSong = await Song.fetch();
     */
    async fetch(): Promise<Song> {
        if (!isString(this.client.key)) {
            throw new RequiresGeniusKeyError();
        }

        const data = await this.client.api.get(`/songs/${this.id}`);
        const parsed = JSON.parse(data);

        this.album = parsed.response.song.album
            ? new Album(parsed.response.song.album, this.artist)
            : undefined;
        this.releasedAt = parsed.response.song.release_date
            ? new Date(parsed.response.song.release_date)
            : undefined;
        this.partial = false;

        return this;
    }

    removeChorus(lyrics: string): string {
        return lyrics.replace(/\[[^\]]+\]\n?/g, "");
    }
}

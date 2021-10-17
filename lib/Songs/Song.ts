import got from "got";
import cheerio, { Cheerio } from "cheerio";
import { Client } from "../Client";
import { Album } from "../Albums/Album";
import { Artist } from "../Artists/Artist";
import { Constants } from "../Constants";

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
    raw: any;

    constructor(
        public readonly client: Client,
        res: any,
        public partial: boolean = false
    ) {
        this.title = res.title;
        this.fullTitle = res.full_title;
        this.featuredTitle = res.title_with_featured;
        this.id = +res.id;
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
        this.raw = res;
    }

    /**
     * Fetches Lyrics of the Track
     * @example const Lyrics = await Song.lyrics(true);
     */
    async lyrics(removeChorus: boolean = false) {
        if (typeof removeChorus !== "boolean") {
            throw new Error("Invalid 'removeChorus' type");
        }

        const { body } = await got.get(this.url, {
            ...this.client.config.requestOptions,
            headers: {
                "User-Agent": Constants.DEF_USER_AGENT,
                ...this.client.config.requestOptions?.headers,
            },
        });

        const $ = cheerio.load(body);
        let lyricsDivs: Cheerio<Element> | undefined = undefined;

        const selectors = [".lyrics", "div[class*='Lyrics__Container']"];
        for (const x of selectors) {
            const divs: Cheerio<Element> = $(x) as any;
            if (divs.length > 0) {
                lyricsDivs = divs;
                break;
            }
        }
        if (!lyricsDivs?.length) {
            throw new Error(Constants.NO_RESULT);
        }

        let lyrics = lyricsDivs
            .toArray()
            .map((x) => {
                const ele = $(x as any);
                ele.find("br").replaceWith("\n");
                return ele.text();
            })
            .join("\n");

        if (removeChorus) {
            lyrics = lyrics.replace(/^\[.*\]$/gm, "");
        }

        return lyrics.trim();
    }

    /**
     * Fetches All Information about the Track and updates all the existing Properties (Requires Key)
     * @example const NewSong = await Song.fetch();
     */
    async fetch() {
        if (!this.client.key) {
            throw new Error(Constants.REQUIRES_KEY);
        }

        const data = await this.client.api.get(`/songs/${this.id}`);
        const parsed = JSON.parse(data);

        this.album = parsed.song.album
            ? new Album(parsed.song.album, this.artist)
            : undefined;
        this.releasedAt = parsed.song.release_date
            ? new Date(parsed.song.release_date)
            : undefined;
        this.partial = false;

        return this;
    }
}

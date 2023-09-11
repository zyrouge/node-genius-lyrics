import html from "node-html-parser";
import { Client } from "../client";
import { Album } from "../albums/album";
import { Artist } from "../artists/artist";
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
     * Fetches lyrics of the track.
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

        const body = await this.client.request.get(this.url);
        const document = html(body);
        const lyricsRoot = document.getElementById("lyrics-root");

        const lyrics = lyricsRoot
            .querySelectorAll("[data-lyrics-container='true']")
            .map((x) => {
                x.querySelectorAll("br").forEach((y) => {
                    y.replaceWith(new html.TextNode("\n"));
                });
                return x.text;
            })
            .join("\n")
            .trim();

        if (!lyrics?.length) {
            throw new NoResultError();
        }

        return removeChorus ? Song.removeChorus(lyrics) : lyrics;
    }

    /**
     * Fetches all information about the track and updates all the existing properties (requires key).
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

    static removeChorus(lyrics: string): string {
        return lyrics.replace(/\[[^\]]+\]\n?/g, "");
    }
}

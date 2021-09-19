import axios from "axios";
import cheerio from "cheerio";
import Album from "../Albums/Album";
import Artist from "../Artists/Artist";
import { Constants, Config } from "../Constants";
import Utils from "../Utils";

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
    private key?: string;
    private config: Config;

    constructor(res: any, key?: string, partial: boolean = false, config: Config = {}) {
        if (!res || typeof res !== "object") throw new Error(Constants.INV_RES_OBJ);
        if (key && typeof key !== "string") throw new Error(Constants.INV_TOKEN);
        if (!Utils.checkConfig(config)) throw new Error(Constants.INV_CONFIG_OBJ);

        this.title = res.title;
        this.fullTitle = res.full_title;
        this.featuredTitle = res.title_with_featured;
        this.id = Number(res.id);
        this.thumbnail = res.header_image_thumbnail_url;
        this.image = res.header_image_url;
        this.url = res.url;
        this.endpoint = res.api_path;
        this.artist = new Artist(res.primary_artist, key, true);
        this.partial = Boolean(partial);
        this.album = !this.partial && res.album ? new Album(res.album, this.artist) : undefined;
        this.releasedAt = !this.partial && res.release_date ? new Date(res.release_date) : undefined;
        this.raw = res;
        this.key = key || undefined;
        this.config = config;
    }

    /**
     * Fetches Lyrics of the Track
     * @example const Lyrics = await Song.lyrics(true);
     */
    async lyrics(removeChorus: boolean = false) {
        if (typeof removeChorus !== "boolean") throw new Error("Invalid 'removeChorus' type");
        if (!this.url) throw new Error("No Track URL");
        try {
            const config = this.config.requestOptions || {};
            if (!config.headers) config.headers = {};
            if (!config.headers["User-Agent"]) config.headers["User-Agent"] = Constants.DEF_USER_AGENT;

            const { data } = await axios.get(this.url, config);
            const $ = cheerio.load(data);
            const lyricsDivs = $("div[class*='Lyrics__Container']");

            if (!lyricsDivs.length) throw new Error(Constants.NO_RESULT);

            let lyrics = "";
            lyricsDivs.each(function () {
                const ele = $(this);
                ele.find("br").replaceWith("\n");
                
                let text = ele.text();
                lyrics += "\n" + text.trim();
            });
            if (!lyrics.length) throw new Error(Constants.NO_RESULT);

            if (removeChorus) lyrics = lyrics.replace(/^\[.*\]$/gm, "");

            return lyrics.trim();
        } catch (err: any) {
            if (err && err.response && err.response.status && err.response.status == 401) throw new Error(Constants.INV_TOKEN);
            throw err;
        }
    }

    /**
     * Fetches All Information about the Track and updates all the existing Properties (Requires Key)
     * @example const NewSong = await Song.fetch();
     */
    async fetch() {
        if (!this.key) throw new Error(Constants.REQUIRES_KEY);
        try {
            const config = this.config.requestOptions || {};
            if (!config.headers) config.headers = {};
            if (!config.headers["User-Agent"]) config.headers["User-Agent"] = Constants.DEF_USER_AGENT;
            config.headers["Authorization"] = `Bearer ${this.key}`;
            const { data } = await axios.get(`${this.config.origin?.api || Constants.BASE_URL}/songs/${this.id}`, config);
            if (data.error) throw new Error(Constants.ERR_W_MSG(data.error, data.error_description));
            if (!data || !data.meta || data.meta.status == 404) throw new Error(Constants.NO_RESULT);
            if (data.meta.status !== 200) throw new Error(Constants.ERR_W_MSG(data.meta.status, data.meta.message));
            if (!data.response || !data.response.song) throw new Error(Constants.NO_RESULT);

            this.album = data.response.song.album ? new Album(data.response.song.album, this.artist) : undefined;
            this.releasedAt = data.response.song.release_date ? new Date(data.response.song.release_date) : undefined;
            this.partial = false;

            return this;
        } catch (err: any) {
            if (err && err.response && err.response.status && err.response.status == 401) throw new Error(Constants.INV_TOKEN);
            throw err;
        }
    }
}
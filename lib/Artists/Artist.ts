import axios from "axios";
import { Config, Constants } from "../Constants";
import Utils from "../Utils";
import Song from "../Songs/Song";

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
    }
    partial: boolean;
    socialmedia: {
        facebook?: string;
        twitter?: string;
    }
    raw: any;
    private key?: string;
    private config: Config;

    constructor(res: any, key?: string, partial: boolean = false, config: Config = {}) {
        if (!res || typeof res !== "object") throw new Error(Constants.INV_RES_OBJ);
        if (key && typeof key !== "string") throw new Error(Constants.INV_TOKEN);
        if (!Utils.checkConfig(config)) throw new Error(Constants.INV_CONFIG_OBJ);

        this.name = res.name;
        this.id = Number(res.id);
        this.url = res.url;
        this.thumbnail = res.image_url;
        this.image = res.header_image_url;
        this.iq = Number(res.iq) || 0;
        this.verified = {
            normal: Boolean(res.is_verified),
            meme: Boolean(res.is_meme_verified)
        }
        this.partial = Boolean(partial);
        this.socialmedia = {
            facebook: res.facebook_name || undefined,
            twitter: res.twitter_name || undefined
        }
        this.raw = res;
        this.key = key || undefined;
        this.config = config;
    }

    /**
     * Fetches the songs of the Artist (Requires Key)
     * @example const Songs = await Artist.songs();
     */
    async songs(options: {
        sort?: string;
        page?: number;
        per_page?: number;
    } = {}) {
        if (!options || typeof options !== "object") throw new Error("Options must be an object");
        if (!this.key) throw new Error(Constants.REQUIRES_KEY);

        const per_page = Number(options.per_page) || 20;
        const sort = options.sort && Constants.ARTIST_SORTS.includes(options.sort) ? options.sort : "title";
        const page = Number(options.page) || 1;

        try {
            const config = this.config.requestOptions || {};
            if (!config.headers) config.headers = {};
            if (!config.headers["User-Agent"]) config.headers["User-Agent"] = Constants.DEF_USER_AGENT;
            config.headers["Authorization"] = `Bearer ${this.key}`;
            const { data } = await axios.get(`${this.config.origin?.api || Constants.BASE_URL}/artists/${this.id}/songs?page=${page}&per_page=${per_page}&sort=${sort}`, config);
            if (data.error) throw new Error(Constants.ERR_W_MSG(data.error, data.error_description));
            if (!data || !data.meta || data.meta.status === 404) throw new Error(Constants.NO_RESULT);
            if (data.meta.status !== 200) throw new Error(Constants.ERR_W_MSG(data.meta.status, data.meta.message));
            if (!data.response || !data.response.songs || !data.response.songs.length) throw new Error(Constants.NO_RESULT);

            return data.response.songs.map((s: any) => new Song(s, this.key, true, this.config));
        } catch (err) {
            if (err && err.response && err.response.status && err.response.status == 401) throw new Error(Constants.INV_TOKEN);
            throw err;
        }
    }

    /**
     * Fetches All Information about the Artist and updates all the existing Properties (Requires Key)
     * @example const NewArtist = await Artist.fetch();
     */
    async fetch() {
        if (!this.key) throw new Error(Constants.REQUIRES_KEY);

        try {
            const config = this.config.requestOptions || {};
            if (!config.headers) config.headers = {};
            if (!config.headers["User-Agent"]) config.headers["User-Agent"] = Constants.DEF_USER_AGENT;
            config.headers["Authorization"] = `Bearer ${this.key}`;
            const { data } = await axios.get(`${this.config.origin?.api || Constants.BASE_URL}/artists/${this.id}`, config);
            if (data.error) throw new Error(`Returned ${data.error} with message: ${data.error_description}`);
            if (!data || !data.meta) throw new Error(`No Result was received`);
            if (data.meta.status == 404) throw new Error(`No Result was found`);
            if (data.meta.status !== 200) throw new Error(`Returned ${data.meta.status} with message: ${data.meta.message}`);
            if (!data.response.artist) throw new Error(`No Result was found`);

            this.socialmedia.facebook = data.response.artist.facebook_name;
            this.socialmedia.twitter = data.response.artist.twitter_name;
            this.raw = data.response.artist;
            this.partial = false;

            return new Artist(data.response.artist, this.key, false, this.config);
        } catch (err) {
            if (err && err.response && err.response.status && err.response.status == 401) throw new Error(Constants.INV_TOKEN);
            throw err;
        }
    }
}
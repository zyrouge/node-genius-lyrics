import axios from "axios";
import Song from "./Song";
import { Config, Constants } from "../Constants";
import Utils from "../Utils";

export default class SongsClient {
    private key?: string;
    private config: Config;

    /**
     * @example const SongsClient = new Genius.Songs.Client(key);
     */
    constructor(key?: string, config: Config = {}) {
        if (key && typeof key !== "string") throw new Error(Constants.INV_TOKEN);
        if (!Utils.checkConfig(config)) throw new Error(Constants.INV_CONFIG_OBJ);

        this.key = key || undefined;
        this.config = config;
    }

    /**
     * Searches for songs for the provided query (Key is optional)
     * @example const SearchResults = await SongsClient.search("faded");
     */
    async search(q: string) {
        if (typeof q !== "string") throw new Error("Query must be an string");

        try {
            const term = encodeURIComponent(q);
            let result: any[] = [];
            if (this.key) {
                const config = this.config.requestOptions || {};
                if (!config.headers) config.headers = {};
                if (!config.headers["User-Agent"]) config.headers["User-Agent"] = Constants.DEF_USER_AGENT;
                config.headers["Authorization"] = `Bearer ${this.key}`;
                const res = await axios.get(`${this.config.origin?.api || Constants.BASE_URL}/search?q=${term}`, config);

                if (res.data.error) throw new Error(Constants.ERR_W_MSG(res.data.error, res.data.error_description));
                if (!res.data || !res.data.meta || res.data.meta.status == 404) throw new Error(Constants.NO_RESULT);
                if (res.data.meta.status !== 200) throw new Error(Constants.ERR_W_MSG(res.data.meta.status, res.data.meta.message));
                if (!res.data.response || !res.data.response.hits || !res.data.response.hits.length) throw new Error(Constants.NO_RESULT);

                result = res.data.response.hits;
            } else {
                const res = await axios.get(`${this.config.origin?.url || Constants.UN_BASE_URL}/search/multi?per_page=5&q=${term}`, this.config.requestOptions);

                if (!res.data || !res.data.meta) throw new Error(Constants.NO_RESULT);
                if (res.data.meta.status == 404) throw new Error(Constants.NO_RESULT);
                if (res.data.meta.status !== 200) throw new Error(Constants.ERR_W_MSG(res.data.meta.status, res.data.meta.message));
                if (!res.data.response || !res.data.response.sections) throw new Error(Constants.NO_RESULT);

                const __hits = res.data.response.sections.find((s: any) => s.type === "song");
                if (!__hits || !__hits.hits || !__hits.hits.length) throw new Error(Constants.NO_RESULT);

                result = __hits.hits;
            }

            return result.filter(s => s.type === "song").map(s => new Song(s.result, this.key, true, this.config));
        } catch (err: any) {
            if (err && err.response && err.response.status && err.response.status == 401) throw new Error(Constants.INV_TOKEN);
            throw err;
        }
    }

    /**
     * Fetches the Song using the provided ID (Requires Key)
     * @example const Song = await SongsClient.get(3276244);
     */
    async get(q: number) {
        if (!q || typeof q !== "number") throw new Error("Invalid Song ID");
        if (!this.key) throw new Error(Constants.REQUIRES_KEY);

        try {
            const config = this.config.requestOptions || {};
            if (!config.headers) config.headers = {};
            if (!config.headers["User-Agent"]) config.headers["User-Agent"] = Constants.DEF_USER_AGENT;
            config.headers["Authorization"] = `Bearer ${this.key}`;
            const { data } = await axios.get(`${this.config.origin?.api || Constants.BASE_URL}/songs/${q}`, config);
            if (data.error) throw new Error(Constants.ERR_W_MSG(data.error, data.error_description));
            if (!data || !data.meta) throw new Error(Constants.NO_RESULT);
            if (data.meta.status == 404) throw new Error(Constants.NO_RESULT);
            if (data.meta.status !== 200) throw new Error(Constants.ERR_W_MSG(data.meta.status, data.meta.message));

            return new Song(data.response.song, this.key, false, this.config);
        } catch (err: any) {
            if (err && err.response && err.response.status && err.response.status == 401) throw new Error(Constants.INV_TOKEN);
            throw err;
        }
    }
}
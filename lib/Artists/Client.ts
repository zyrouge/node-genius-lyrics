import axios from "axios";
import Artist from "./Artist";
import { Constants, Config } from "../Constants";
import Utils from "../Utils";

export default class ArtistsClient {
    private key?: string;
    private config: Config;

    /**
     * @example const ArtistsClient = await Genius.Artist.Client(key);
     */
    constructor(key?: string, config: Config = {}) {
        if (key && typeof key !== "string") throw new Error(Constants.INV_TOKEN);
        if (!Utils.checkConfig(config)) throw new Error(Constants.INV_CONFIG_OBJ);

        this.key = key || undefined;
        this.config = config;
    }

    /**
     * Fetches the Artist using the provided ID (Requires Key)
     * @example const Artist = await ArtistsClient.get(456537);
     */
    async get(q: number) {
        if (!q || typeof q !== "number") throw new Error("Invalid Artist ID");
        if (!this.key) throw new Error(Constants.REQUIRES_KEY);

        try {
            const config = this.config.requestOptions || {};
            if (!config.headers) config.headers = {};
            if (!config.headers["User-Agent"]) config.headers["User-Agent"] = Constants.DEF_USER_AGENT;
            config.headers["Authorization"] = `Bearer ${this.key}`;
            const { data } = await axios.get(`${this.config.origin?.api || Constants.BASE_URL}/artists/${q}`, config);
            if (data.error) throw new Error(Constants.ERR_W_MSG(data.error, data.error_description));
            if (!data || !data.meta || data.meta.status === 404) throw new Error(Constants.NO_RESULT);
            if (data.meta.status !== 200) throw new Error(Constants.ERR_W_MSG(data.meta.status, data.meta.message));
            if (!data.response.artist) throw new Error(Constants.NO_RESULT);

            return new Artist(data.response.artist, this.key, false, this.config);            
        } catch (err: any) {
            if (err && err.response && err.response.status && err.response.status == 401) throw new Error(Constants.INV_TOKEN);
            throw err;
        }
    }
}

module.exports = ArtistsClient;
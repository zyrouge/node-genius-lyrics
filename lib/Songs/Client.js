"use strict";

const axios = require("axios");
const Song = require("./Song");
const CONSTANTS = require("../Constants");

class SongsClient {

    /**
     * @param {string} [key] Genius Token
     * @param {Config} [config] Configuration
     * @example const SongsClient = new Genius.Songs.Client(key);
     */
    constructor(key, config = {}) {
        if (key && typeof key !== "string") throw new Error(CONSTANTS.INV_TOKEN);
        if (config && typeof config !== "object") throw new Error("Invalid Config");

        /**
         * @private
         */
        this.key = key || undefined;

        /**
         * @private
         */
        this.config = config;
    }

    /**
     * Searches for songs for the provided query (Key is optional)
     * @param {string} q Search terms
     * @returns {Promise<Song[]>}
     * @example const SearchResults = await SongsClient.search("faded");
     */
    search(q) {
        if (!q || typeof q !== "string") throw new Error("Query must be an string");

        const term = encodeURIComponent(q);
        return new Promise(async (resolve, reject) => {
            try {
                let result = [];
                if (this.key) {
                    const res = await axios.get(`${CONSTANTS.BASE_URL}/search?q=${term}`, {
                        ...this.config.requestOptions,
                        headers: {
                            'Authorization': `Bearer ${this.key}`
                        }
                    });

                    if (res.data.error) reject(CONSTANTS.ERR_W_MSG(res.data.error, res.data.error_description));
                    if (!res.data || !res.data.meta || res.data.meta.status == 404) reject(CONSTANTS.NO_RESULT);
                    if (res.data.meta.status !== 200) reject(CONSTANTS.ERR_W_MSG(res.data.meta.status, res.data.meta.message));
                    if (!res.data.response || !res.data.response.hits || !res.data.response.hits.length) reject(CONSTANTS.NO_RESULT);

                    result = res.data.response.hits;
                } else {
                    const res = await axios.get(`${CONSTANTS.UN_BASE_URL}/search/multi?per_page=5&q=${term}`, this.config.requestOptions);

                    if (!res.data || !res.data.meta) reject(CONSTANTS.NO_RESULT);
                    if (res.data.meta.status == 404) reject(CONSTANTS.NO_RESULT);
                    if (res.data.meta.status !== 200) reject(CONSTANTS.ERR_W_MSG(res.data.meta.status, res.data.meta.message));
                    if (!res.data.response || !res.data.response.sections) reject(CONSTANTS.NO_RESULT);

                    const __hits = res.data.response.sections.find(s => s.type === "song");
                    if (!__hits || !__hits.hits || !__hits.hits.length) reject(CONSTANTS.NO_RESULT);

                    result = __hits.hits;
                }

                const tracks = result.filter(s => s.type === "song").map(s => new Song(s.result, this.key, true, this.config));
                resolve(tracks);
            } catch (e) {
                if (e && e.response && e.response.status && e.response.status == 401) reject(CONSTANTS.INV_TOKEN);
                reject(e);
            }
        });
    }

    /**
     * Fetches the Song using the provided ID (Requires Key)
     * @param {number} q ID of the Song
     * @returns {Promise<Song>}
     * @example const Song = await SongsClient.get(3276244);
     */
    get(q) {
        if (!q || typeof q !== "number") throw new Error("Invalid Song ID");
        if (!this.key) throw new Error(CONSTANTS.REQUIRES_KEY);

        return new Promise((resolve, reject) => {
            axios.get(`${CONSTANTS.BASE_URL}/songs/${q}`, {
                ...this.config.requestOptions,
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
                .then(res => {
                    if (res.data.error) reject(CONSTANTS.ERR_W_MSG(res.data.error, res.data.error_description));
                    if (!res.data || !res.data.meta) reject(CONSTANTS.NO_RESULT);
                    if (res.data.meta.status == 404) reject(CONSTANTS.NO_RESULT);
                    if (res.data.meta.status !== 200) reject(CONSTANTS.ERR_W_MSG(res.data.meta.status, res.data.meta.message));

                    const track = new Song(res.data.response.song, this.key, false, this.config);
                    resolve(track);
                })
                .catch(e => {
                    if (e && e.response && e.response.status && e.response.status == 401) reject(CONSTANTS.INV_TOKEN);
                    reject(e);
                });
        });
    }
}

module.exports = SongsClient;
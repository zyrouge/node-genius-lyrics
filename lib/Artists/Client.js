"use strict";

const axios = require("axios");
const Artist = require("./Artist");
const CONSTANTS = require("../Constants");

class ArtistsClient {

    /**
     * @param {string} [key] Genius Token
     * @param {Config} [config] Configuration
     * @example const ArtistsClient = await Genius.Artist.Client(key);
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
     * Fetches the Artist using the provided ID (Requires Key)
     * @param {number} q - ID of the Artist
     * @returns {Promise<Artist>}
     * @example const Artist = await ArtistsClient.get(456537);
     */
    get(q) {
        if (!q || typeof q !== "number") throw new Error("Invalid Artist ID");
        if (!this.key) throw new Error(CONSTANTS.REQUIRES_KEY);

        return new Promise((resolve, reject) => {
            axios.get(`${CONSTANTS.BASE_URL}/artists/${q}`, {
                ...this.config.requestOptions,
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
                .then(res => {
                    if (res.data.error) reject(CONSTANTS.ERR_W_MSG(res.data.error, res.data.error_description));
                    if (!res.data || !res.data.meta || res.data.meta.status == 404) reject(CONSTANTS.NO_RESULT);
                    if (res.data.meta.status !== 200) reject(CONSTANTS.ERR_W_MSG(res.data.meta.status, res.data.meta.message));
                    if (!res.data.response.artist) reject(CONSTANTS.NO_RESULT);

                    const artist = new Artist(res.data.response.artist, this.key, false, this.config);
                    resolve(artist);
                })
                .catch(e => {
                    if (e && e.response && e.response.status && e.response.status == 401) reject(CONSTANTS.INV_TOKEN);
                    reject(e);
                });
        });
    }
}

module.exports = ArtistsClient;
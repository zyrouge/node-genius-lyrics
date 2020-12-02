"use strict";

const axios = require("axios");
const CONSTANTS = require("../Constants");
const Song = require("../Songs/Song");

class Artist {

    /**
     * @param {Object} res Raw JSON Response from Genius.com
     * @param {string} [key] Genius Token
     * @param {boolean} [partial] Whether it is a Partial JSON
     * @param {Config} [config] Configuration
     */
    constructor(res, key, partial = false, config = {}) {
        if (!res || typeof res !== "object") throw new Error(CONSTANTS.INV_RES_OBJ);
        if (key && typeof key !== "string") throw new Error(CONSTANTS.INV_TOKEN);

        /**
         * Name of the Artist
         * @type {string}
         */
        this.name = res.name;

        /**
         * ID of the Artist
         * @type {number}
         */
        this.id = Number(res.id);

        /**
         * URL of the Artist's Page
         * @type {string}
         */
        this.url = res.url;

        /**
         * Thumbnail URL of the Artist
         * @type {string}
         */
        this.thumbnail = res.image_url;

        /**
         * Image URL of the Artist
         * @type {string}
         */
        this.image = res.header_image_url;

        /**
         * IQ of the Artist
         * @type {number}
         */
        this.iq = Number(res.iq) || 0;

        /**
         * Verified Tags of the Artist
         * @type {Object}
         * @property {boolean} normal
         * @property {boolean} meme
         */
        this.verified = {
            normal: Boolean(res.is_verified),
            meme: Boolean(res.is_meme_verified)
        }

        /**
         * Whether this Artist object only has Partial Information
         * @type {boolean}
         */
        this.partial = Boolean(partial);

        /**
         * Social Media of the Artist
         * @type {Object}
         * @property {string} [facebook]
         * @property {string} [twitter]
         */
        this.socialmedia = {
            facebook: res.facebook_name || undefined,
            twitter: res.twitter_name || undefined
        }

        /**
         * Raw JSON Response
         * @type {Object}
         */
        this.raw = res;

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
     * Fetches the songs of the Artist (Requires Key)
     * @param {Object} [options] Options
     * @param {number} [options.per_page=20] Results per page
     * @param {("title" | "popularity")} [options.sort="title"] Sort
     * @param {number} [options.page=1] Page Number to fetch
     * @returns {Promise<Song[]>}
     * @example const Songs = await Artist.songs();
     */
    songs(options = {}) {
        if (!options || typeof options !== "object") throw new Error("Options must be an object");
        if (!this.key) throw new Error(CONSTANTS.REQUIRES_KEY);

        const per_page = Number(options.per_page) || 20;
        const sort = options.sort && CONSTANTS.ARTIST_SORTS.includes(options.sort) ? options.sort : "title";
        const page = Number(options.page) || 1;

        return new Promise((resolve, reject) => {
            axios.get(`${CONSTANTS.BASE_URL}/artists/${this.id}/songs?page=${page}&per_page=${per_page}&sort=${sort}`, {
                ...this.config.requestOptions,
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
                .then(res => {
                    if (res.data.error) reject(CONSTANTS.ERR_W_MSG(res.data.error, res.data.error_description));
                    if (!res.data || !res.data.meta || res.data.meta.status === 404) reject(CONSTANTS.NO_RESULT);
                    if (res.data.meta.status !== 200) reject(CONSTANTS.ERR_W_MSG(res.data.meta.status, res.data.meta.message));
                    if (!res.data.response || !res.data.response.songs || !res.data.response.songs.length) reject(CONSTANTS.NO_RESULT);

                    const tracks = res.data.response.songs.map(s => new Song(s, this.key, true, this.config));
                    resolve(tracks);
                })
                .catch(e => {
                    if (e && e.response && e.response.status && e.response.status == 401) reject(CONSTANTS.INV_TOKEN);
                    reject(e);
                });
        });
    }

    /**
     * Fetches All Information about the Artist and updates all the existing Properties (Requires Key)
     * @returns {Promise<Artist>}
     * @example const NewArtist = await Artist.fetch();
     */
    fetch() {
        if (!this.key) throw new Error(CONSTANTS.REQUIRES_KEY);

        return new Promise((resolve, reject) => {
            axios.get(`${CONSTANTS.BASE_URL}/artists/${q}`, {
                ...this.config.requestOptions,
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
                .then(res => {
                    if (res.data.error) reject(`Returned ${res.data.error} with message: ${res.data.error_description}`);
                    if (!res.data || !res.data.meta) reject(`No Result was received`);
                    if (res.data.meta.status == 404) reject(`No Result was found`);
                    if (res.data.meta.status !== 200) reject(`Returned ${res.data.meta.status} with message: ${res.data.meta.message}`);
                    if (!res.data.response.artist) reject(`No Result was found`);

                    this.socialmedia.facebook = res.data.response.artist.facebook_name;
                    this.socialmedia.twitter = res.data.response.artist.twitter_name;
                    this.raw = res.data.response.artist;
                    this.partial = false;

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

module.exports = Artist;
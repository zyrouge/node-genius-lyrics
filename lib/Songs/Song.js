"use strict";

const axios = require("axios");
const htmlparser = require("node-html-parser");
const Album = require("../Albums/Album");
const CONSTANTS = require("../Constants");

class Song {

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
         * Title of the Track
         * @type {string}
         */
        this.title = res.title;

        /**
         * Full Title of the Track
         * @type {string}
         */
        this.fullTitle = res.full_title;

        /**
         * Featured Title of the Track
         * @type {string}
         */
        this.featuredTitle = res.title_with_featured;

        /**
         * ID of the Track
         * @type {number}
         */
        this.id = Number(res.id);

        /**
         * Thumbnail URL of the Track
         * @type {string}
         */
        this.thumbnail = res.header_image_thumbnail_url;

        /**
         * Image URL of the Track
         * @type {string}
         */
        this.image = res.header_image_url;

        /**
         * URL of the Track
         * @type {string}
         */
        this.url = res.url;

        /**
         * API Endpoint URL of the Track
         * @type {string}
         */
        this.endpoint = res.api_path;

        /**
         * Artist of the Track
         * @type {?Artist}
         */
        this.artist = new (require("../Artists/Artist"))(res.primary_artist, key, true); // Throws error sooo directly require

        /**
         * Whether the Track only has Partial Information
         * @type {boolean}
         */
        this.partial = Boolean(partial);

        /**
         * Album of the Track
         * @type {?Album}
         */
        this.album = !this.partial && res.album && this.result ? new Album(res.album, this.artist) : undefined;

        /**
         * Release Time of the Track
         * @type {?Date}
         */
        this.releasedAt = !this.partial && res.release_date ? new Date(res.release_date) : undefined;

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
     * Fetches Lyrics of the Track
     * @param {boolean} [removeChorus=false] Whether to remove Chorus Lines
     * @returns {Promise<string>}
     * @example const Lyrics = await Song.lyrics(true);
     */
    lyrics(removeChorus = false) {
        removeChorus = Boolean(removeChorus);

        return new Promise((resolve, reject) => {
            if (!this.url) reject('No Track URL');
            axios.get(this.url, this.config.requestOptions)
                .then(async res => {
                    const DOM = htmlparser.parse(res.data);
                    const lyricsDiv = DOM.querySelector(".lyrics");
                    if (!lyricsDiv || !lyricsDiv.text) reject(CONSTANTS.NO_RESULT);

                    let lyrics = String(lyricsDiv.text.trim());
                    if (!lyrics) reject(CONSTANTS.NO_RESULT);

                    if (removeChorus) lyrics = lyrics.split("\n").filter(line => !line.startsWith("[") && !line.endsWith("]")).join("\n");

                    resolve(lyrics);
                })
                .catch(e => {
                    if (e && e.response && e.response.status && e.response.status == 401) reject(CONSTANTS.INV_TOKEN);
                    reject(e);
                });
        });
    }

    /**
     * Fetches All Information about the Track and updates all the existing Properties (Requires Key)
     * @returns {Promise<Song>}
     * @example const NewSong = await Song.fetch();
     */
    fetch() {
        if (!this.key) throw new Error(CONSTANTS.REQUIRES_KEY);

        return new Promise((resolve, reject) => {
            axios.get(`${CONSTANTS.BASE_URL}/songs/${this.id}`, {
                ...this.config.requestOptions,
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
                .then(res => {
                    if (res.data.error) reject(CONSTANTS.ERR_W_MSG(res.data.error, res.data.error_description));
                    if (!res.data || !res.data.meta || res.data.meta.status == 404) reject(CONSTANTS.NO_RESULT);
                    if (res.data.meta.status !== 200) reject(CONSTANTS.ERR_W_MSG(res.data.meta.status, res.data.meta.message));
                    if (!res.data.response || !res.data.response.song) reject(CONSTANTS.NO_RESULT);

                    this.album = res.data.response.song.album ? new Album(res.data.response.song.album, this.artist) : undefined;
                    this.releasedAt = res.data.response.song.release_date ? new Date(res.data.response.song.release_date) : undefined;
                    this.res = res.data.response.song;
                    this.partial = false;

                    resolve(this);
                })
                .catch(e => {
                    if (e && e.response && e.response.status && e.response.status == 401) reject(CONSTANTS.INV_TOKEN);
                    reject(e);
                });
        });
    }
}

module.exports = Song;
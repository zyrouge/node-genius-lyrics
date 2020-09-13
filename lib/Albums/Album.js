"use strict";

const Artist = require("../Artists/Artist");
const CONSTANTS = require("../Constants");

class Album {

    /**
     * @param {Object} res - Raw JSON Response from Genius.com
     * @param {Artist} artist - Genius Artist
     */
    constructor(res, artist) {
        if(!res || typeof res !== "object") throw new Error(CONSTANTS.INV_RES_OBJ);
        if(!artist || typeof artist !== "object" || !(artist instanceof Artist)) throw new Error(CONSTANTS.INV_RES_OBJ);

        /**
         * Name of the Album
         * @type {string}
         */
        this.name = res.name;

        /**
         * Title of the Album
         * @type {string}
         */
        this.title = res.title;

        /**
         * ID of the Album
         * @type {number}
         */
        this.id = Number(res.id);

        /**
         * Image URL of the Album
         * @type {string}
         */
        this.image = res.cover_art_url;

        /**
         * URL of the Album
         * @type {string}
         */
        this.url = res.url;

        /**
         * API Endpoint URL of the Album
         * @type {string}
         */
        this.endpoint = res.api_path;

        /**
         * Artist of the Album
         * @type {Artist}
         */
        this.artist = artist;

        /**
         * Whether the Album only has Partial Information
         * @type {boolean}
         */
        this.partial = true;

        /**
         * Raw JSON Response
         * @type {Object}
         */
        this.raw = res;
    }
}

module.exports = Album;
"use strict";

const ArtistsClient = require("./Artists/Client");
const SongsClient = require("./Songs/Client");

class Client {

    /**
     * @param {string} [key] Genius Token
     * @param {Config} [config] Configuration
     */
    constructor(key, config = {}) {
        if (key && typeof key !== "string") throw new Error("Invalid Key");
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
     * Change the Key of the Genius Client
     * @param {string} [key] 
     */
    setKey(key) {
        this.key = key;
        return true;
    }

    /**
     * Songs Fetcher
     * @type {SongsClient}
     */
    get songs() {
        return new SongsClient(this.key, this.config);
    }

    /**
     * Artist Fetcher
     * @type {ArtistsClient}
     */
    get artists() {
        return new ArtistsClient(this.key, this.config);
    }
}

module.exports = Client;
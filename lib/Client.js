"use strict";

const ArtistsClient = require("./Artists/Client");
const SongsClient = require("./Songs/Client");

class Client {

    /**
     * @param {string} [key] - Genius Token
     */
    constructor(key) {
        if(key && typeof key !== "string") throw new Error("Invalid Key");

        /**
         * @private
         */
        this.key = key || undefined;
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
        return new SongsClient(this.key);
    }

    /**
     * Artist Fetcher
     * @type {ArtistsClient}
     */
    get artists() {
        return new ArtistsClient(this.key);
    }
}

module.exports = Client;
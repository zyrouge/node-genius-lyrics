"use strict";

const axios = require("axios").default;

/**
 * @typedef {object} Config
 * @property {axios.AxiosRequestConfig} requestOptions Axios Request Options
 */

/**
 * @namespace Constants
 */
const CONSTANTS = {

    /**
     * @memberof Constants
     * @type {string}
     */
    BASE_URL: "https://api.genius.com",

    /**
     * @memberof Constants
     * @type {string}
     */
    UN_BASE_URL: "https://genius.com/api",

    /**
     * @memberof Constants
     * @type {string}
     */
    ARTIST_SORTS: ["title", "popularity"],

    /**
     * @memberof Constants
     * @type {string}
     */
    REQUIRES_KEY: "This action requires a valid Genius Token",

    /**
     * @memberof Constants
     * @type {string}
     */
    INV_RES_OBJ: "Invalid response object",

    /**
     * @memberof Constants
     * @type {string}
     */
    INV_TOKEN: "Invalid Genius Token",

    /**
     * @memberof Constants
     * @type {string}
     */
    NO_RESULT: "No result was found",

    /**
     * @memberof Constants
     * @param {any} err
     * @param {any} msg
     * @returns {string}
     */
    ERR_W_MSG: (err, msg) => `Returned ${err} with Message: ${msg}`
}

module.exports = CONSTANTS;
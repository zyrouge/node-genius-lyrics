/**
 * @exports genius-lyrics
 * @example const Genius = require("genius-lyrics");
 */

module.exports = {

    /**
     * @type {Client}
     * @example const Client = new Genius.Client(key);
     */
    Client: require("./lib/Client"),

    /**
     * @type {SongsClient}
     * @example const Client = new Genius.SongsClient(key);
     */
    SongsClient: require("./lib/Songs/Client"),

    /**
     * @type {ArtistsClient}
     * @example const Client = new Genius.ArtistsClient(key);
     */
    ArtistsClient: require("./lib/Artists/Client"),

    /**
     * @type {Song}
     */
    Song: require("./lib/Songs/Song"),

    /**
     * @type {Artist}
     */
    Artist: require("./lib/Artists/Artist"),

    /**
     * @type {Album}
     */
    Album: require("./lib/Albums/Album"),

    /**
     * @type {Constants}
     */
    Constants: require("./lib/Constants"),

    /**
     * @type {string}
     */
    Version: require("./package.json").version
}
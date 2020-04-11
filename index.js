'use strict';

const Client = require("./lib/Client");

function Genius(token, options) {
    return new Client(token, options);
}

Genius.Client = Client;
Genius.version = require("./package.json").version;
Genius.Tracks = require("./lib/util/Tracks");
Genius.Track = require("./lib/util/Track");

module.exports = Genius;
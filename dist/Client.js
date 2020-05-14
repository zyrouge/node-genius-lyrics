"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./Clients/Tracks/index");
var index_2 = require("./Clients/Artists/index");
var default_1 = /** @class */ (function () {
    function default_1(key) {
        if (!key)
            throw new Error('(GeniusLyrics) No Genius Key was Provided!');
        this.key = key;
        this.tracks = new index_1.default(key);
        this.artists = new index_2.default(key);
    }
    return default_1;
}());
exports.default = default_1;
;
//# sourceMappingURL=Client.js.map
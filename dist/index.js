"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Version = exports.Utils = exports.Constants = exports.Album = exports.Artist = exports.Song = exports.ArtistsClient = exports.SongsClient = exports.Client = void 0;
const Client_1 = __importDefault(require("./Client"));
exports.Client = Client_1.default;
const Client_2 = __importDefault(require("./Songs/Client"));
exports.SongsClient = Client_2.default;
const Client_3 = __importDefault(require("./Artists/Client"));
exports.ArtistsClient = Client_3.default;
const Song_1 = __importDefault(require("./Songs/Song"));
exports.Song = Song_1.default;
const Artist_1 = __importDefault(require("./Artists/Artist"));
exports.Artist = Artist_1.default;
const Album_1 = __importDefault(require("./Albums/Album"));
exports.Album = Album_1.default;
const Utils_1 = __importDefault(require("./Utils"));
exports.Utils = Utils_1.default;
const Constants_1 = require("./Constants");
Object.defineProperty(exports, "Constants", { enumerable: true, get: function () { return Constants_1.Constants; } });
const Version = require("../package.json").version;
exports.Version = Version;
exports.default = {
    Client: Client_1.default,
    SongsClient: Client_2.default,
    ArtistsClient: Client_3.default,
    Song: Song_1.default,
    Artist: Artist_1.default,
    Album: Album_1.default,
    Constants: Constants_1.Constants,
    Utils: Utils_1.default,
    Version
};

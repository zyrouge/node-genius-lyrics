"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const node_html_parser_1 = __importDefault(require("node-html-parser"));
const Album_1 = __importDefault(require("../Albums/Album"));
const Artist_1 = __importDefault(require("../Artists/Artist"));
const Constants_1 = require("../Constants");
const Utils_1 = __importDefault(require("../Utils"));
class Song {
    constructor(res, key, partial = false, config = {}) {
        if (!res || typeof res !== "object")
            throw new Error(Constants_1.Constants.INV_RES_OBJ);
        if (key && typeof key !== "string")
            throw new Error(Constants_1.Constants.INV_TOKEN);
        if (!Utils_1.default.checkConfig(config))
            throw new Error(Constants_1.Constants.INV_CONFIG_OBJ);
        this.title = res.title;
        this.fullTitle = res.full_title;
        this.featuredTitle = res.title_with_featured;
        this.id = Number(res.id);
        this.thumbnail = res.header_image_thumbnail_url;
        this.image = res.header_image_url;
        this.url = res.url;
        this.endpoint = res.api_path;
        this.artist = new Artist_1.default(res.primary_artist, key, true);
        this.partial = Boolean(partial);
        this.album = !this.partial && res.album ? new Album_1.default(res.album, this.artist) : undefined;
        this.releasedAt = !this.partial && res.release_date ? new Date(res.release_date) : undefined;
        this.raw = res;
        this.key = key || undefined;
        this.config = config;
    }
    /**
     * Fetches Lyrics of the Track
     * @example const Lyrics = await Song.lyrics(true);
     */
    lyrics(removeChorus = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof removeChorus !== "boolean")
                throw new Error("Invalid 'removeChorus' type");
            if (!this.url)
                throw new Error("No Track URL");
            try {
                const { data } = yield axios_1.default.get(this.url, this.config.requestOptions);
                const DOM = node_html_parser_1.default(data);
                const lyricsDiv = DOM.querySelector(".lyrics");
                if (!lyricsDiv || !lyricsDiv.text)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                let lyrics = lyricsDiv.text.trim();
                if (!lyrics)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                if (removeChorus)
                    lyrics = lyrics.split("\n").filter(line => !line.startsWith("[") && !line.endsWith("]")).join("\n");
                return lyrics;
            }
            catch (err) {
                if (err && err.response && err.response.status && err.response.status == 401)
                    throw new Error(Constants_1.Constants.INV_TOKEN);
                throw err;
            }
        });
    }
    /**
     * Fetches All Information about the Track and updates all the existing Properties (Requires Key)
     * @example const NewSong = await Song.fetch();
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.key)
                throw new Error(Constants_1.Constants.REQUIRES_KEY);
            try {
                const { data } = yield axios_1.default.get(`${Constants_1.Constants.BASE_URL}/songs/${this.id}`, Object.assign(Object.assign({}, this.config.requestOptions), { headers: {
                        "Authorization": `Bearer ${this.key}`
                    } }));
                if (data.error)
                    throw new Error(Constants_1.Constants.ERR_W_MSG(data.error, data.error_description));
                if (!data || !data.meta || data.meta.status == 404)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                if (data.meta.status !== 200)
                    throw new Error(Constants_1.Constants.ERR_W_MSG(data.meta.status, data.meta.message));
                if (!data.response || !data.response.song)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                this.album = data.response.song.album ? new Album_1.default(data.response.song.album, this.artist) : undefined;
                this.releasedAt = data.response.song.release_date ? new Date(data.response.song.release_date) : undefined;
                this.partial = false;
                return this;
            }
            catch (err) {
                if (err && err.response && err.response.status && err.response.status == 401)
                    throw new Error(Constants_1.Constants.INV_TOKEN);
                throw err;
            }
        });
    }
}
exports.default = Song;

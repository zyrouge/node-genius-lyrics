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
const Constants_1 = require("../Constants");
const Utils_1 = __importDefault(require("../Utils"));
const Song_1 = __importDefault(require("../Songs/Song"));
class Artist {
    constructor(res, key, partial = false, config = {}) {
        if (!res || typeof res !== "object")
            throw new Error(Constants_1.Constants.INV_RES_OBJ);
        if (key && typeof key !== "string")
            throw new Error(Constants_1.Constants.INV_TOKEN);
        if (!Utils_1.default.checkConfig(config))
            throw new Error(Constants_1.Constants.INV_CONFIG_OBJ);
        this.name = res.name;
        this.id = Number(res.id);
        this.url = res.url;
        this.thumbnail = res.image_url;
        this.image = res.header_image_url;
        this.iq = Number(res.iq) || 0;
        this.verified = {
            normal: Boolean(res.is_verified),
            meme: Boolean(res.is_meme_verified)
        };
        this.partial = Boolean(partial);
        this.socialmedia = {
            facebook: res.facebook_name || undefined,
            twitter: res.twitter_name || undefined
        };
        this.raw = res;
        this.key = key || undefined;
        this.config = config;
    }
    /**
     * Fetches the songs of the Artist (Requires Key)
     * @example const Songs = await Artist.songs();
     */
    songs(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!options || typeof options !== "object")
                throw new Error("Options must be an object");
            if (!this.key)
                throw new Error(Constants_1.Constants.REQUIRES_KEY);
            const per_page = Number(options.per_page) || 20;
            const sort = options.sort && Constants_1.Constants.ARTIST_SORTS.includes(options.sort) ? options.sort : "title";
            const page = Number(options.page) || 1;
            try {
                const { data } = yield axios_1.default.get(`${Constants_1.Constants.BASE_URL}/artists/${this.id}/songs?page=${page}&per_page=${per_page}&sort=${sort}`, Object.assign(Object.assign({}, this.config.requestOptions), { headers: {
                        "Authorization": `Bearer ${this.key}`
                    } }));
                if (data.error)
                    throw new Error(Constants_1.Constants.ERR_W_MSG(data.error, data.error_description));
                if (!data || !data.meta || data.meta.status === 404)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                if (data.meta.status !== 200)
                    throw new Error(Constants_1.Constants.ERR_W_MSG(data.meta.status, data.meta.message));
                if (!data.response || !data.response.songs || !data.response.songs.length)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                return data.response.songs.map((s) => new Song_1.default(s, this.key, true, this.config));
            }
            catch (err) {
                if (err && err.response && err.response.status && err.response.status == 401)
                    throw new Error(Constants_1.Constants.INV_TOKEN);
                throw err;
            }
        });
    }
    /**
     * Fetches All Information about the Artist and updates all the existing Properties (Requires Key)
     * @example const NewArtist = await Artist.fetch();
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.key)
                throw new Error(Constants_1.Constants.REQUIRES_KEY);
            try {
                const { data } = yield axios_1.default.get(`${Constants_1.Constants.BASE_URL}/artists/${this.id}`, Object.assign(Object.assign({}, this.config.requestOptions), { headers: {
                        'Authorization': `Bearer ${this.key}`
                    } }));
                if (data.error)
                    throw new Error(`Returned ${data.error} with message: ${data.error_description}`);
                if (!data || !data.meta)
                    throw new Error(`No Result was received`);
                if (data.meta.status == 404)
                    throw new Error(`No Result was found`);
                if (data.meta.status !== 200)
                    throw new Error(`Returned ${data.meta.status} with message: ${data.meta.message}`);
                if (!data.response.artist)
                    throw new Error(`No Result was found`);
                this.socialmedia.facebook = data.response.artist.facebook_name;
                this.socialmedia.twitter = data.response.artist.twitter_name;
                this.raw = data.response.artist;
                this.partial = false;
                return new Artist(data.response.artist, this.key, false, this.config);
            }
            catch (err) {
                if (err && err.response && err.response.status && err.response.status == 401)
                    throw new Error(Constants_1.Constants.INV_TOKEN);
                throw err;
            }
        });
    }
}
exports.default = Artist;

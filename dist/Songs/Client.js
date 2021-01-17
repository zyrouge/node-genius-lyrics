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
const Song_1 = __importDefault(require("./Song"));
const Constants_1 = require("../Constants");
const Utils_1 = __importDefault(require("../Utils"));
class SongsClient {
    /**
     * @example const SongsClient = new Genius.Songs.Client(key);
     */
    constructor(key, config = {}) {
        if (key && typeof key !== "string")
            throw new Error(Constants_1.Constants.INV_TOKEN);
        if (!Utils_1.default.checkConfig(config))
            throw new Error(Constants_1.Constants.INV_CONFIG_OBJ);
        this.key = key || undefined;
        this.config = config;
    }
    /**
     * Searches for songs for the provided query (Key is optional)
     * @example const SearchResults = await SongsClient.search("faded");
     */
    search(q) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof q !== "string")
                throw new Error("Query must be an string");
            try {
                const term = encodeURIComponent(q);
                let result = [];
                if (this.key) {
                    const res = yield axios_1.default.get(`${Constants_1.Constants.BASE_URL}/search?q=${term}`, Object.assign(Object.assign({}, this.config.requestOptions), { headers: {
                            'Authorization': `Bearer ${this.key}`
                        } }));
                    if (res.data.error)
                        throw new Error(Constants_1.Constants.ERR_W_MSG(res.data.error, res.data.error_description));
                    if (!res.data || !res.data.meta || res.data.meta.status == 404)
                        throw new Error(Constants_1.Constants.NO_RESULT);
                    if (res.data.meta.status !== 200)
                        throw new Error(Constants_1.Constants.ERR_W_MSG(res.data.meta.status, res.data.meta.message));
                    if (!res.data.response || !res.data.response.hits || !res.data.response.hits.length)
                        throw new Error(Constants_1.Constants.NO_RESULT);
                    result = res.data.response.hits;
                }
                else {
                    const res = yield axios_1.default.get(`${Constants_1.Constants.UN_BASE_URL}/search/multi?per_page=5&q=${term}`, this.config.requestOptions);
                    if (!res.data || !res.data.meta)
                        throw new Error(Constants_1.Constants.NO_RESULT);
                    if (res.data.meta.status == 404)
                        throw new Error(Constants_1.Constants.NO_RESULT);
                    if (res.data.meta.status !== 200)
                        throw new Error(Constants_1.Constants.ERR_W_MSG(res.data.meta.status, res.data.meta.message));
                    if (!res.data.response || !res.data.response.sections)
                        throw new Error(Constants_1.Constants.NO_RESULT);
                    const __hits = res.data.response.sections.find((s) => s.type === "song");
                    if (!__hits || !__hits.hits || !__hits.hits.length)
                        throw new Error(Constants_1.Constants.NO_RESULT);
                    result = __hits.hits;
                }
                return result.filter(s => s.type === "song").map(s => new Song_1.default(s.result, this.key, true, this.config));
            }
            catch (err) {
                if (err && err.response && err.response.status && err.response.status == 401)
                    throw new Error(Constants_1.Constants.INV_TOKEN);
                throw err;
            }
        });
    }
    /**
     * Fetches the Song using the provided ID (Requires Key)
     * @example const Song = await SongsClient.get(3276244);
     */
    get(q) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!q || typeof q !== "number")
                throw new Error("Invalid Song ID");
            if (!this.key)
                throw new Error(Constants_1.Constants.REQUIRES_KEY);
            try {
                const { data } = yield axios_1.default.get(`${Constants_1.Constants.BASE_URL}/songs/${q}`, Object.assign(Object.assign({}, this.config.requestOptions), { headers: {
                        'Authorization': `Bearer ${this.key}`
                    } }));
                if (data.error)
                    throw new Error(Constants_1.Constants.ERR_W_MSG(data.error, data.error_description));
                if (!data || !data.meta)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                if (data.meta.status == 404)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                if (data.meta.status !== 200)
                    throw new Error(Constants_1.Constants.ERR_W_MSG(data.meta.status, data.meta.message));
                return new Song_1.default(data.response.song, this.key, false, this.config);
            }
            catch (err) {
                if (err && err.response && err.response.status && err.response.status == 401)
                    throw new Error(Constants_1.Constants.INV_TOKEN);
                throw err;
            }
        });
    }
}
exports.default = SongsClient;

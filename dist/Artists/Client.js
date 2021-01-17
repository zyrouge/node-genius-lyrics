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
const Artist_1 = __importDefault(require("./Artist"));
const Constants_1 = require("../Constants");
const Utils_1 = __importDefault(require("../Utils"));
class ArtistsClient {
    /**
     * @example const ArtistsClient = await Genius.Artist.Client(key);
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
     * Fetches the Artist using the provided ID (Requires Key)
     * @example const Artist = await ArtistsClient.get(456537);
     */
    get(q) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!q || typeof q !== "number")
                throw new Error("Invalid Artist ID");
            if (!this.key)
                throw new Error(Constants_1.Constants.REQUIRES_KEY);
            try {
                const { data } = yield axios_1.default.get(`${this.config.origin && this.config.origin.api ? this.config.origin.api : Constants_1.Constants.BASE_URL}/artists/${q}`, Object.assign(Object.assign({}, this.config.requestOptions), { headers: {
                        'Authorization': `Bearer ${this.key}`
                    } }));
                if (data.error)
                    throw new Error(Constants_1.Constants.ERR_W_MSG(data.error, data.error_description));
                if (!data || !data.meta || data.meta.status === 404)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                if (data.meta.status !== 200)
                    throw new Error(Constants_1.Constants.ERR_W_MSG(data.meta.status, data.meta.message));
                if (!data.response.artist)
                    throw new Error(Constants_1.Constants.NO_RESULT);
                return new Artist_1.default(data.response.artist, this.key, false, this.config);
            }
            catch (err) {
                if (err && err.response && err.response.status && err.response.status == 401)
                    throw new Error(Constants_1.Constants.INV_TOKEN);
                throw err;
            }
        });
    }
}
exports.default = ArtistsClient;
module.exports = ArtistsClient;

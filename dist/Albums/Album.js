"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Artist_1 = __importDefault(require("../Artists/Artist"));
const Constants_1 = require("../Constants");
class Album {
    constructor(res, artist) {
        if (!res || typeof res !== "object")
            throw new Error(Constants_1.Constants.INV_RES_OBJ);
        if (!artist || typeof artist !== "object" || !(artist instanceof Artist_1.default))
            throw new Error(Constants_1.Constants.INV_RES_OBJ);
        this.name = res.name;
        this.title = res.title;
        this.id = Number(res.id);
        this.image = res.cover_art_url;
        this.url = res.url;
        this.endpoint = res.api_path;
        this.artist = artist;
        this.partial = true;
        this.raw = res;
    }
}
exports.default = Album;

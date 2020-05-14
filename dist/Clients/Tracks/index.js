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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Track_1 = require("../../Classes/Track");
var Tracks_1 = require("../../Classes/Tracks");
var TracksClient = /** @class */ (function () {
    function TracksClient(key) {
        if (!key)
            throw new Error('(GeniusLyrics) No Genius Client was Found!');
        this.key = key;
    }
    TracksClient.prototype.search = function (q, options) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                /* Real Code */
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        axios_1.default.get("https://api.genius.com/search?q=" + q, {
                            headers: {
                                'Authorization': "Bearer " + _this.key
                            }
                        })
                            .then(function (res) { return __awaiter(_this, void 0, void 0, function () {
                            var tracks, allTracks, limitLength, i, track;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (res.data.error)
                                            reject("(GeniusLyrics) Returned " + res.data.error + " with message: " + res.data.error_description);
                                        if (!res.data || !res.data.meta)
                                            reject("(GeniusLyrics) No Result was received.");
                                        if (res.data.meta.status == 404)
                                            reject("(GeniusLyrics) No Result was found.");
                                        if (res.data.meta.status !== 200)
                                            reject("(GeniusLyrics) Returned " + res.data.meta.status + " with message: " + res.data.meta.message);
                                        if (!res.data.response || !res.data.response.hits)
                                            reject("(GeniusLyrics) No Result was received.");
                                        if (!res.data.response.hits.length)
                                            reject("(GeniusLyrics) No Song(s) was received.");
                                        tracks = new Tracks_1.default();
                                        allTracks = res.data.response.hits;
                                        limitLength = options && options.limit && (allTracks.length > options.limit) ? options.limit : allTracks.length;
                                        if (options && options.onlySongs)
                                            allTracks.filter(function (s) { return s.type == 'song'; });
                                        if (options && options.extended)
                                            resolve(allTracks.filter(function (s, i) { return (s && i < limitLength); }).map(function (s) { return JSON.parse("{ \"title\": \"" + s.result.title + "\", \"id\": \"" + s.result.id + "\" }"); }));
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < limitLength)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, this.get(allTracks[i].result.id)];
                                    case 2:
                                        track = _a.sent();
                                        tracks.push(track);
                                        if ((i + 1) == limitLength)
                                            resolve(tracks);
                                        _a.label = 3;
                                    case 3:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); })
                            .catch(function (e) {
                            if (e && e.response && e.response.status && e.response.status == 401)
                                reject("(GeniusLyrics) Invalid Genius Token");
                            reject("(GeniusLyrics) " + e);
                        });
                    })];
            });
        });
    };
    TracksClient.prototype.get = function (q) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                if (!q)
                    throw new Error('(GeniusLyrics) ID should only be a Number');
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        axios_1.default.get("https://api.genius.com/songs/" + q, {
                            headers: {
                                'Authorization': "Bearer " + _this.key
                            }
                        })
                            .then(function (res) {
                            if (res.data.error)
                                reject("(GeniusLyrics) Returned " + res.data.error + " with message: " + res.data.error_description);
                            if (!res.data || !res.data.meta)
                                reject("(GeniusLyrics) No Result was received.");
                            if (res.data.meta.status == 404)
                                reject("(GeniusLyrics) No Result was found.");
                            if (res.data.meta.status !== 200)
                                reject("(GeniusLyrics) Returned " + res.data.meta.status + " with message: " + res.data.meta.message);
                            var track = new Track_1.default(res.data.response.song, _this.key);
                            resolve(track);
                        })
                            .catch(function (e) {
                            if (e && e.response && e.response.status && e.response.status == 401)
                                reject("(GeniusLyrics) Invalid Genius Token");
                            reject("(GeniusLyrics) " + e);
                        });
                    })];
            });
        });
    };
    return TracksClient;
}());
exports.default = TracksClient;
//# sourceMappingURL=index.js.map
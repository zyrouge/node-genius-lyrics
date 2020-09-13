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
var _this = this;
var Genius = require("..");
var Token = "GjZdsQku4iZ7k9QRw0v3g2PRBRe6zrAe3NzPLBqdA-fBEFC_u1DbxuFF5FZvSxPL";
var Client = new Genius.Client(Token);
var intervals = 0;
var wait = function (time) { return new Promise(function (resolve) {
    setTimeout(function () {
        intervals += 1;
        console.log("Pausing... (to avoid ratelimiting)\n");
        resolve();
    }, time);
}); };
var test = function () { return __awaiter(_this, void 0, void 0, function () {
    var startTime, searches, firstSong, lyrics, artist, againArtist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                startTime = Date.now();
                console.log("Genius-Lyrics v" + Genius.Version);
                return [4 /*yield*/, Client.songs.search("faded")];
            case 1:
                searches = _a.sent();
                firstSong = searches[0];
                console.log("About the Song:\n", firstSong, "\n");
                return [4 /*yield*/, wait(1000)];
            case 2:
                _a.sent();
                return [4 /*yield*/, firstSong.lyrics()];
            case 3:
                lyrics = _a.sent();
                console.log("Lyrics of the Song:\n", lyrics, "\n");
                return [4 /*yield*/, wait(1000)];
            case 4:
                _a.sent();
                artist = firstSong.artist;
                console.log("About the Artist:\n", artist, "\n");
                return [4 /*yield*/, wait(1000)];
            case 5:
                _a.sent();
                return [4 /*yield*/, Client.artists.get(456537)];
            case 6:
                againArtist = _a.sent();
                console.log("About the Artist (Again):\n", againArtist, "\n");
                // Done
                console.log("Completed fetching in " + (Date.now() - startTime) + "ms in " + intervals + " intervals");
                return [2 /*return*/];
        }
    });
}); };
test();

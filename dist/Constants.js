"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Constants = void 0;
exports.Constants = {
    BASE_URL: "https://api.genius.com",
    UN_BASE_URL: "https://genius.com/api",
    ARTIST_SORTS: ["title", "popularity"],
    REQUIRES_KEY: "This action requires a valid Genius Token",
    INV_RES_OBJ: "Invalid response object",
    INV_CONFIG_OBJ: "Invalid config",
    INV_TOKEN: "Invalid Genius Token",
    NO_RESULT: "No result was found",
    ERR_W_MSG: (err, msg) => `Returned ${err} with Message: ${msg}`
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const checkConfig = (config) => {
    if (!config ||
        typeof config !== "object")
        return false;
    if (config.requestOptions && config.requestOptions !== "object")
        return false;
    if (config.origin) {
        if (config.origin !== "object" ||
            (config.origin.api && config.origin.api !== "string") ||
            (config.origin.url && config.origin.url !== "string"))
            return false;
    }
    return true;
};
exports.default = { checkConfig };

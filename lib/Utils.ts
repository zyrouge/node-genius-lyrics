import { Config } from "./Constants";

const checkConfig = (config: any): config is Config => {
    if (
        !config ||
        typeof config !== "object"
    ) return false;

    if (config.requestOptions && typeof config.requestOptions !== "object") return false;

    if (config.origin) {
        if (
            typeof config.origin !== "object" ||
            (config.origin.api && typeof config.origin.api !== "string") ||
            (config.origin.url && typeof config.origin.url !== "string")
        ) return false;
    }

    return true;
}

export default { checkConfig };
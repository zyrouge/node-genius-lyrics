import { Config } from "./Constants";

const checkConfig = (config: any): config is Config => {
    if (
        !config ||
        typeof config !== "object"
    ) return false;

    if (config.requestOptions && config.requestOptions !== "object") return false;

    if (config.origin) {
        if (
            config.origin !== "object" ||
            (config.origin.api && config.origin.api !== "string") ||
            (config.origin.url && config.origin.url !== "string")
        ) return false;
    }

    return true;
}

export default { checkConfig };
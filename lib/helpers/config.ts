import { MethodlessRequestOptions } from "./http";
import { isObject, isString, isUndefined } from "./types";

export interface Config {
    requestOptions?: MethodlessRequestOptions;
    origin?: {
        api?: string;
        url?: string;
    };
}

export const isValidConfig = (config: any): config is Config =>
    isObject(config) &&
    (isUndefined(config.requestOptions) || isObject(config.requestOptions)) &&
    (isUndefined(config.origin) ||
        (isObject(config.origin) &&
            (isUndefined(config.origin.api) || isString(config.origin.api)) &&
            (isUndefined(config.origin.url) || isString(config.origin.url))));

import { AxiosRequestConfig } from "axios";

export interface Config {
    requestOptions?: AxiosRequestConfig;
    origin?: {
        api?: string;
        url?: string;
    }
}

export const Constants = {
    BASE_URL: "https://api.genius.com",
    UN_BASE_URL: "https://genius.com/api",
    ARTIST_SORTS: ["title", "popularity"],
    DEF_USER_AGENT: "Mozilla/5.0 (Windows NT x.y; Win64; x64; rv:10.0) Gecko/20100101 Firefox/10.0",
    REQUIRES_KEY: "This action requires a valid Genius Token",
    INV_RES_OBJ: "Invalid response object",
    INV_CONFIG_OBJ: "Invalid config",
    INV_TOKEN: "Invalid Genius Token",
    NO_RESULT: "No result was found",
    ERR_W_MSG: (err: any, msg: any) => `Returned ${err} with Message: ${msg}`
}
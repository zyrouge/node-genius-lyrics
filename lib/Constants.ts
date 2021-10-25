import { OptionsOfTextResponseBody } from "got";

export interface Config {
    requestOptions?: Omit<OptionsOfTextResponseBody, "responseType">;
    origin?: {
        api?: string;
        url?: string;
    };
}

export const Constants = {
    BASE_URL: "https://api.genius.com",
    UN_BASE_URL: "https://genius.com/api",
    ARTIST_SORTS: ["title", "popularity"],
    DEF_USER_AGENT:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.36",
    REQUIRES_KEY: "This action requires a valid Genius Token",
    INV_RES_OBJ: "Invalid response object",
    INV_CONFIG_OBJ: "Invalid config",
    INV_TOKEN: "Invalid Genius Token",
    NO_RESULT: "No result was found",
    ERR_W_MSG: (err: any, msg: any) => `Returned ${err} with message: ${msg}`,
};

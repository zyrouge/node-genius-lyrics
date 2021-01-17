import { AxiosRequestConfig } from "axios";
export interface Config {
    requestOptions?: AxiosRequestConfig;
    origin?: {
        api?: string;
        url?: string;
    };
}
export declare const Constants: {
    BASE_URL: string;
    UN_BASE_URL: string;
    ARTIST_SORTS: string[];
    REQUIRES_KEY: string;
    INV_RES_OBJ: string;
    INV_CONFIG_OBJ: string;
    INV_TOKEN: string;
    NO_RESULT: string;
    ERR_W_MSG: (err: any, msg: any) => string;
};

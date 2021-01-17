import Client from "./Client";
import SongsClient from "./Songs/Client";
import ArtistsClient from "./Artists/Client";
import Song from "./Songs/Song";
import Artist from "./Artists/Artist";
import Album from "./Albums/Album";
import Utils from "./Utils";
import { Constants, Config } from "./Constants";
declare const Version: string;
export { Client, SongsClient, ArtistsClient, Song, Artist, Album, Constants, Config, Utils, Version };
declare const _default: {
    Client: typeof Client;
    SongsClient: typeof SongsClient;
    ArtistsClient: typeof ArtistsClient;
    Song: typeof Song;
    Artist: typeof Artist;
    Album: typeof Album;
    Constants: {
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
    Utils: {
        checkConfig: (config: any) => config is Config;
    };
    Version: string;
};
export default _default;

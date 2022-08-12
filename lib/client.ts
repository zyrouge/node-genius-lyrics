import { Constants } from "./helpers/constants";
import { ApiClient } from "./api";
import { ArtistsClient } from "./artists/client";
import { SongsClient } from "./songs/client";
import { Config, isValidConfig } from "./helpers/config";
import { InvalidTypeError } from "./errors";
import { isString, isUndefined, joinTypes } from "./helpers/types";

export class Client {
    songs: SongsClient;
    artists: ArtistsClient;
    api: ApiClient;

    constructor(
        public readonly key?: string,
        public readonly config: Config = {}
    ) {
        if (!isUndefined(key) && !isString(key)) {
            throw new InvalidTypeError(
                "key",
                joinTypes("string", "undefined"),
                typeof key
            );
        }

        if (!isValidConfig(config)) {
            throw new InvalidTypeError("config", "Config", typeof config);
        }

        this.songs = new SongsClient(this);
        this.artists = new ArtistsClient(this);

        this.api = new ApiClient(
            this.config.origin?.api || Constants.officialApiURL,
            {
                headers: {
                    "User-Agent": Constants.defaultUserAgent,
                    Authorization: `Bearer ${this.key}`,
                },
            }
        );
    }
}

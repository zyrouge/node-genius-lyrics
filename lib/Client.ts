import { Config, Constants } from "./Constants";
import Utils from "./Utils";
import Requester from "./Requester";
import ArtistsClient from "./Artists/Client";
import SongsClient from "./Songs/Client";

export default class Client {
    songs: SongsClient;
    artists: ArtistsClient;
    api: Requester;

    constructor(
        public readonly key?: string,
        public readonly config: Config = {}
    ) {
        if (!["string", "undefined"].includes(typeof key)) {
            throw new Error(Constants.INV_TOKEN);
        }

        if (!Utils.checkConfig(config)) {
            throw new Error(Constants.INV_CONFIG_OBJ);
        }

        this.songs = new SongsClient(this);
        this.artists = new ArtistsClient(this);

        this.api = new Requester(
            this.config.origin?.api || Constants.BASE_URL,
            {
                headers: {
                    "User-Agent": Constants.DEF_USER_AGENT,
                    Authorization: `Bearer ${this.key}`,
                },
            }
        );
    }
}

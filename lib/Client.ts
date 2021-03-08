import { Config, Constants } from "./Constants";
import Utils from "./Utils";
import ArtistsClient from "./Artists/Client";
import SongsClient from "./Songs/Client";

export default class Client {
    private key?: string;
    private config: Config;

    constructor(key?: string, config: Config = {}) {
        if (key && typeof key !== "string") throw new Error(Constants.INV_TOKEN);
        if (!Utils.checkConfig(config)) throw new Error(Constants.INV_CONFIG_OBJ);

        this.key = key || undefined;
        this.config = config;
    }

    setKey(key: string | undefined) {
        this.key = key;
    }

    get songs() {
        return new SongsClient(this.key, this.config);
    }

    get artists() {
        return new ArtistsClient(this.key, this.config);
    }
}

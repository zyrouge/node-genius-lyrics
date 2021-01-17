import { Config } from "./Constants";
import ArtistsClient from "./Artists/Client";
import SongsClient from "./Songs/Client";
export default class Client {
    private key?;
    private config;
    constructor(key: string, config?: Config);
    setKey(key: string | undefined): void;
    get songs(): SongsClient;
    get artists(): ArtistsClient;
}

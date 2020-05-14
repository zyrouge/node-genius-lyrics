import TracksClient from "./Clients/Tracks/index";
import ArtistClient from "./Clients/Artists/index";
export default class {
    key: string;
    tracks: TracksClient;
    artists: ArtistClient;
    constructor(key: string);
}

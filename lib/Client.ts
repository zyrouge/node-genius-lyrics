import TracksClient from "./Clients/Tracks/index";
import ArtistClient from "./Clients/Artists/index";

export default class {

    key: string;
    tracks: TracksClient;
    artists: ArtistClient;

    constructor(key: string) {
        if(!key) throw new Error('(GeniusLyrics) No Genius Key was Provided!');
        this.key = key;
        this.tracks = new TracksClient(key);
        this.artists = new ArtistClient(key);
    }

};
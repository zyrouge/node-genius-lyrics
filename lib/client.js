const TracksClient = require("./prototypes/TracksClient");
const FetchClient = require("./prototypes/FetchClient");
const ArtistsClient = require("./prototypes/ArtistClient");

class Client {

    constructor(key) {
        if(!key) throw new Error('(GeniusLyrics) No Genius Key was Provided!');
        this.key = key;
        const fetcher = new FetchClient({ key: key });
        this.fetcher = fetcher;
        this.tracks = new TracksClient({ key: key, fetcher: fetcher });
        this.artists = new ArtistsClient({ key: key, fetcher: fetcher });
    }

}

module.exports = Client;
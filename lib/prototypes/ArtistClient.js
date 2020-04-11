const Artist = require("../util/Artist");

class ArtistClient {
    constructor(options) {
        if(!options) throw new Error('(GeniusLyrics) No Genius Client was Found!');
        this.key = options.key;
        this.fetcher = options.fetcher;
    }

    async get(q) {
        if(!q || isNaN(q)) throw new Error('(GeniusLyrics) ID should only be a Number');
        return new Promise((resolve, reject) => {
            this.fetcher.fetch(`https://api.genius.com/artists/${q}`)
            .then(res => {
                const artist = new Artist(res.response.artist, { key: this.key, fetcher: this.fetcher });
                resolve(artist);
            })
            .catch(e => reject(`(GeniusLyrics) ${e}`));
        });
    }
}

module.exports = ArtistClient;
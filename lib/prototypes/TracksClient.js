const Track = require("../util/Track");
const Tracks = require("../util/Tracks");

class TracksClient {
    constructor(options) {
        if(!options) throw new Error('(GeniusLyrics) No Genius Client was Found!');
        this.key = options.key;
        this.fetcher = options.fetcher;
    }

    async search(q, opts = {}) {
        opts.onlySongs = !!opts.onlySongs || true;
        opts.extended = !!opts.extended || false;
        opts.limit = isNaN(opts.limit) ? 10 : parseInt(opts.limit);

        /* Real Code */
        return new Promise((resolve, reject) => {
            this.fetcher.fetch(`https://api.genius.com/search?q=${q}`)
            .then(async res => {
                const tracks = new Tracks();
                const allTracks = res.response.hits;
                const limitLength = (allTracks.length > opts.limit) ? opts.limit : allTracks.length;
                if(opts.onlySongs) allTracks.filter(s => s.type == 'song');
                if(opts.extended) resolve(allTracks.filter((s, i) => i < limitLength).map(s => JSON.parse(`{ "title": "${s.result.title}", "id": "${s.result.id}" }`)));
                for(let i=0; i < limitLength; i++) {
                    const track = await this.get(allTracks[i].result.id);
                    tracks.push(track);
                    if((i+1) == limitLength) resolve(tracks);
                }
            })
            .catch(e => reject(`(GeniusLyrics) ${e}`));
        });
    }

    async get(q) {
        if(!q || isNaN(q)) throw new Error('(GeniusLyrics) ID should only be a Number');
        return new Promise((resolve, reject) => {
            this.fetcher.fetch(`https://api.genius.com/songs/${q}`)
            .then(res => {
                const track = new Track(res.response.song, { key: this.key, fetcher: this.fetcher });
                resolve(track);
            })
            .catch(e => reject(`(GeniusLyrics) ${e}`));
        });
    }
}

module.exports = TracksClient;
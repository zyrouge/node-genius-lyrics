const Tracks = require("./Tracks");

class Artist {
    constructor(a, options) {
        this.name = a.name || null;
        this.id = a.id || null;
        this.url = a.url || null;
        this.thumbnail = a.image_url || null;
        this.image = a.header_image_url || null;
        this.nicknames = a.alternate_names || null;
        this.iq = a.iq || null;
        this.socialmedia = {
            facebook: a.facebook_name || null,
            twitter: a.twitter_name || null
        };
        this.verified = {
            normal: !!a.is_verified,
            meme: !!a.is_meme_verified
        } || null;
        this.user = a.user || null;
        this.raw = a || null;
        this.options = options;
    }

    async songs(opts = {}) {
        opts.per_page = isNaN(opts.per_page) ? 20 : parseInt(opts.per_page);
        opts.sort = opts.sort || "title";
        opts.page = isNaN(opts.page) ? 1 : parseInt(opts.page);

        /* Real Code */
        if(!this.id || isNaN(this.id)) throw new Error('(GeniusLyrics) No Artist ID was provided!');
        if(!["title", "popularity"].includes(opts.sort)) throw new Error('(GeniusLyrics) Sort must be title or popularity!');
        if(typeof opts.per_page !== "number") throw new Error('(GeniusLyrics) per_page must be a number!');
        if(typeof opts.page !== "number") throw new Error('(GeniusLyrics) page must be a number!');
        if(typeof opts.sort !== "string") throw new Error('(GeniusLyrics) sort must be a string!');
        const tracks = new Tracks();
        return new Promise((resolve, reject) => {
            this.options.fetcher.fetch(`https://api.genius.com/artists/${this.id}/songs?page=${opts.page}&per_page=${opts.per_page}&sort=${opts.sort}`)
            .then(res => {
                const allTracks = res.response.songs;
                for(let i = 0; i < allTracks.length; i++) {
                    let current = allTracks[i];
                    tracks.push(new (require("./Track"))(current, this.options));
                    if((i+1) == allTracks.length) resolve(tracks);
                }
            })
            .catch(e => reject(`(GeniusLyrics) ${e}`));
        });
    }
}

module.exports = Artist;
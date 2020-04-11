class FetchClient {
    constructor(options) {
        if(!options) throw new Error('(GeniusLyrics) No Genius Client was Found!');
        this.key = options.key;
    }

    async fetch(url) {
        return new Promise((resolve, reject) => {
            const nodeFetch = require("node-fetch");
            nodeFetch(url, {
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
            .then(res => res.json())
            .then(res => resolve(res))
            .catch(e => reject(`(GeniusLyrics) ${e}`));
        });
    }
}

module.exports = FetchClient;
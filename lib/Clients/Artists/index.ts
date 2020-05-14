import axios from "axios";
import Artist from "../../Classes/Artist/index";

class ArtistClient {

    key: string;

    constructor(key: string) {
        if(!key) throw new Error('(GeniusLyrics) No Genius Client was Found!');
        this.key = key;
    }

    async get(q: string): Promise <Artist> {
        if(!q) throw new Error('(GeniusLyrics) ID should only be a Number');
        return new Promise((resolve, reject) => {
            axios.get(`https://api.genius.com/artists/${q}`, {
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
            .then(res => {
                if(res.data.error) reject(`(GeniusLyrics) Returned ${res.data.error} with message: ${res.data.error_description}`);
                if(!res.data || !res.data.meta) reject(`(GeniusLyrics) No Result was received.`);
                if(res.data.meta.status == 404) reject(`(GeniusLyrics) No Result was found.`);
                if(res.data.meta.status !== 200) reject(`(GeniusLyrics) Returned ${res.data.meta.status} with message: ${res.data.meta.message}`);
                const artist = new Artist(res.data.response.artist, this.key);
                resolve(artist);
            })
            .catch(e => {
                if(e && e.response && e.response.status && e.response.status == 401) reject(`(GeniusLyrics) Invalid Genius Token`);
                reject(`(GeniusLyrics) ${e}`);
            });
        });
    }
}

export default ArtistClient;
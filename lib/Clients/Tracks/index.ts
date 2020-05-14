import axios from "axios";
import Track from "../../Classes/Track";
import Tracks from "../../Classes/Tracks";
import TracksOptions from "./TracksOptions";

class TracksClient {

    key: string;

    constructor(key: string) {
        if(!key) throw new Error('(GeniusLyrics) No Genius Client was Found!');
        this.key = key;
    }

    async search(q: string, options?: TracksOptions): Promise <Tracks> {
        /* Real Code */
        return new Promise((resolve, reject) => {
            axios.get(`https://api.genius.com/search?q=${q}`, {
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
            .then(async res => {
                if(res.data.error) reject(`(GeniusLyrics) Returned ${res.data.error} with message: ${res.data.error_description}`);
                if(!res.data || !res.data.meta) reject(`(GeniusLyrics) No Result was received.`);
                if(res.data.meta.status == 404) reject(`(GeniusLyrics) No Result was found.`);
                if(res.data.meta.status !== 200) reject(`(GeniusLyrics) Returned ${res.data.meta.status} with message: ${res.data.meta.message}`);
                if(!res.data.response || !res.data.response.hits) reject(`(GeniusLyrics) No Result was received.`);
                if(!res.data.response.hits.length) reject(`(GeniusLyrics) No Song(s) was received.`);
                const tracks = new Tracks();
                const allTracks = res.data.response.hits;
                const limitLength = options && options.limit && (allTracks.length > options.limit) ? options.limit : allTracks.length;
                if(options && options.onlySongs) allTracks.filter((s: any) => s.type == 'song');
                if(options && options.extended) resolve(allTracks.filter((s: any, i: number) => (s && i < limitLength)).map((s: any) => JSON.parse(`{ "title": "${s.result.title}", "id": "${s.result.id}" }`)));
                for(let i = 0; i < limitLength; i++) {
                    const track = await this.get(allTracks[i].result.id);
                    tracks.push(track);
                    if((i + 1) == limitLength) resolve(tracks);
                }
            })
            .catch(e => {
                if(e && e.response && e.response.status && e.response.status == 401) reject(`(GeniusLyrics) Invalid Genius Token`);
                reject(`(GeniusLyrics) ${e}`);
            });
        });
    }

    async get(q: string) {
        if(!q) throw new Error('(GeniusLyrics) ID should only be a Number');
        return new Promise((resolve, reject) => {
            axios.get(`https://api.genius.com/songs/${q}`, {
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
            .then(res => {
                if(res.data.error) reject(`(GeniusLyrics) Returned ${res.data.error} with message: ${res.data.error_description}`);
                if(!res.data || !res.data.meta) reject(`(GeniusLyrics) No Result was received.`);
                if(res.data.meta.status == 404) reject(`(GeniusLyrics) No Result was found.`);
                if(res.data.meta.status !== 200) reject(`(GeniusLyrics) Returned ${res.data.meta.status} with message: ${res.data.meta.message}`);
                const track = new Track(res.data.response.song, this.key);
                resolve(track);
            })
            .catch(e => {
                if(e && e.response && e.response.status && e.response.status == 401) reject(`(GeniusLyrics) Invalid Genius Token`);
                reject(`(GeniusLyrics) ${e}`);
            });
        });
    }
}

export default TracksClient;
import axios from "axios";
import Track from "../Track";
import Tracks from "../Tracks";
import ArtistSongsOptions from "./ArtistSongsOptions";
import verified from "./verified";
import socialmedia from "./socialmedia";

class Artist {

    name: string | null;
    id: number | null;
    url: string | null;
    thumbnail: string | null;
    image: string | null;
    iq: number | null;
    socialmedia: socialmedia | null;
    verified: verified | null;
    raw: any;
    user: any;
    key: string;

    constructor(a: any, key: string) {
        this.name = a.name || null;
        this.id = a.id || null;
        this.url = a.url || null;
        this.thumbnail = a.image_url || null;
        this.image = a.header_image_url || null;
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
        this.key = key;
    }

    async songs(options?: ArtistSongsOptions): Promise <Tracks> {
        const per_page = options && options.per_page ? options.per_page : 20;
        const sort = options && options.sort ? options.sort : "title";
        const page = options && options.page ? options.page : 1;

        /* Real Code */
        const tracks = new Tracks();
        return new Promise((resolve, reject) => {
            axios.get(`https://api.genius.com/artists/${this.id}/songs?page=${page}&per_page=${per_page}&sort=${sort}`, {
                headers: {
                    'Authorization': `Bearer ${this.key}`
                }
            })
            .then(res => {
                const allTracks = res.data.response.songs;
                for(let i = 0; i < allTracks.length; i++) {
                    let current = allTracks[i];
                    tracks.push(new Track(current, this.key));
                    if((i + 1) == allTracks.length) resolve(tracks);
                }
            })
            .catch(e => {
                if(e && e.response && e.response.status && e.response.status == 401) reject(`(GeniusLyrics) Invalid Genius Token`);
                reject(`(GeniusLyrics) ${e}`);
            });
        });
    }
}

export default Artist;
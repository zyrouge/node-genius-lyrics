import axios from "axios";
import { load } from "cheerio";
import Artist from "../Artist";
import titles from "./titles";

class Track {

    title: string | null;
    titles: titles | null;
    id: number | null;
    thumbnail: string | null;
    image: string | null;
    url: string;
    artist: Artist | null;
    album: any | null;
    stats: any | null;
    releasedAt: string | null;
    featured: boolean;
    raw: any;
    user: any;

    constructor(t: any, key: string) {
        this.title = t.title || null;
        this.titles = {
            full: t.full_title || null,
            featured: t.title_with_featured || null
        };
        this.id = t.id || null;
        this.thumbnail = t.header_image_thumbnail_url || null;
        this.image = t.header_image_url || null;
        this.url = t.url;
        this.artist = t.primary_artist ? new Artist(t.primary_artist, key) : null;
        this.album = t.album || null;
        this.releasedAt = t.release_date || null;
        this.stats = t.stats || null;
        this.featured = !!t.featured_video || false;
        this.raw = t || null;
    }

    async lyrics(): Promise <string> {
        return new Promise((resolve, reject) => {
            if(this.url == null) reject('(GeniusLyrics) No Track URL.');
            axios.get(this.url)
            .then(res => {
                const $ = load(res.data);
                const lyrics = $('.lyrics');
                if(!lyrics) reject('(GeniusLyrics) No Lyrics was found.')
                resolve(lyrics.text().trim());
            })
            .catch(e => {
                if(e && e.response && e.response.status && e.response.status == 401) reject(`(GeniusLyrics) Invalid Genius Token`);
                reject(`(GeniusLyrics) ${e}`);
            });
        });
    }
}

export default Track;
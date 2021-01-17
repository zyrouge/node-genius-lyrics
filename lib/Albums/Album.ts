import Artist from "../Artists/Artist";
import { Constants } from "../Constants";

export default class Album {
    name: string;
    title: string;
    id: number;
    image: string;
    url: string;
    endpoint: string;
    artist: Artist;
    partial: boolean;
    raw: any;

    constructor(res: any, artist: Artist) {
        if(!res || typeof res !== "object") throw new Error(Constants.INV_RES_OBJ);
        if (!artist || typeof artist !== "object" || !(artist instanceof Artist)) throw new Error(Constants.INV_RES_OBJ);

        this.name = res.name;
        this.title = res.title;
        this.id = Number(res.id);
        this.image = res.cover_art_url;
        this.url = res.url;
        this.endpoint = res.api_path;
        this.artist = artist;
        this.partial = true;
        this.raw = res;
    }
}
import { Artist } from "../artists/artist";
import { InvalidDataError } from "../errors";
import { isObject } from "../helpers/types";

export class Album {
    name: string;
    title: string;
    id: number;
    image: string;
    url: string;
    endpoint: string;
    artist: Artist;
    partial: boolean;
    _raw: any;

    constructor(res: any, artist: Artist) {
        if (!isObject(res) || !(artist instanceof Artist)) {
            throw new InvalidDataError();
        }

        this.name = res.name;
        this.title = res.title;
        this.id = parseInt(res.id);
        this.image = res.cover_art_url;
        this.url = res.url;
        this.endpoint = res.api_path;
        this.artist = artist;
        this.partial = true;
        this._raw = res;
    }
}

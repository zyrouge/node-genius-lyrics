import Artist from "../Artists/Artist";
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
    constructor(res: any, artist: Artist);
}

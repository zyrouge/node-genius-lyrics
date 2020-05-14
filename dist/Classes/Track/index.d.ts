import Artist from "../Artist";
import titles from "./titles";
declare class Track {
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
    constructor(t: any, key: string);
    lyrics(): Promise<string>;
}
export default Track;

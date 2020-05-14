import Tracks from "../Tracks";
import ArtistSongsOptions from "./ArtistSongsOptions";
import verified from "./verified";
import socialmedia from "./socialmedia";
declare class Artist {
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
    constructor(a: any, key: string);
    songs(options?: ArtistSongsOptions): Promise<Tracks>;
}
export default Artist;

import Artist from "../../Classes/Artist/index";
declare class ArtistClient {
    key: string;
    constructor(key: string);
    get(q: string): Promise<Artist>;
}
export default ArtistClient;

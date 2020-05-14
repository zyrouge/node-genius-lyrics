import Tracks from "../../Classes/Tracks";
import TracksOptions from "./TracksOptions";
declare class TracksClient {
    key: string;
    constructor(key: string);
    search(q: string, options?: TracksOptions): Promise<Tracks>;
    get(q: string): Promise<unknown>;
}
export default TracksClient;

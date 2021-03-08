import Genius from "../dist";
import util from "util";

const Token = "GjZdsQku4iZ7k9QRw0v3g2PRBRe6zrAe3NzPLBqdA-fBEFC_u1DbxuFF5FZvSxPL";
const timeout = 1000;

const Client = new Genius.Client(Token);
const wait = util.promisify(setTimeout);

const tryRun = async (func: () => any) => {
    let tries = 0, maxtries = 3, error: any;
    while (tries < maxtries) {
        try {
            let res = await func();
            return res;
        } catch (err) {
            tries += 1;
            error = err;
        }
        wait(timeout);
    }
    throw error;
}

const test = async () => {
    const startTime = Date.now();
    const searches = await tryRun(() => Client.songs.search("faded"));

    const firstSong = searches[0];
    console.log("First song:");
    console.log(firstSong);
    await wait(timeout);

    const SongWID = await tryRun(() => Client.songs.get(firstSong.id));
    console.log("\nWith ID:");
    console.log(SongWID);
    await wait(timeout);

    const sidlyrics = await tryRun(() => firstSong.lyrics());
    console.log(`\nLyrics of ${SongWID.title}:`);
    console.log(sidlyrics);
    await wait(timeout);

    const artist = firstSong.artist;
    console.log(`\nAbout ${artist.name}:`);
    console.log(artist);
    await wait(timeout);

    const againArtistNo = 456537;
    const againArtist = await tryRun(() => Client.artists.get(againArtistNo));
    console.log(`\nAbout Artist ${againArtistNo}:`);
    console.log(againArtist);

    console.log(`\nCompleted in ${Date.now() - startTime}ms`);
};

test();
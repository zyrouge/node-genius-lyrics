import Genius from "../dist";
import util from "util";

const Token = "GjZdsQku4iZ7k9QRw0v3g2PRBRe6zrAe3NzPLBqdA-fBEFC_u1DbxuFF5FZvSxPL";
const Client = new Genius.Client(Token);
const wait = util.promisify(setTimeout);

const test = async () => {
    const startTime = Date.now();
    const searches = await Client.songs.search("faded");

    const firstSong = searches[0];
    console.log("First song:");
    console.log(firstSong);
    await wait(1000);

    const SongWID = await Client.songs.get(firstSong.id);
    console.log("\nWith ID:");
    console.log(SongWID);
    await wait(1000);

    const sidlyrics = await firstSong.lyrics();
    console.log(`\nLyrics of ${SongWID.title}:`);
    console.log(sidlyrics);
    await wait(1000);

    const artist = firstSong.artist;
    console.log(`\nAbout ${artist.name}:`);
    console.log(artist);
    await wait(1000);

    const againArtistNo = 456537;
    const againArtist = await Client.artists.get(againArtistNo);
    console.log(`\nAbout Artist ${againArtistNo}:`);
    console.log(againArtist);

    console.log(`\nCompleted in ${Date.now() - startTime}ms`);
};

test();
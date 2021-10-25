import Genius from "./lib";
import util from "util";

const token =
    "GjZdsQku4iZ7k9QRw0v3g2PRBRe6zrAe3NzPLBqdA-fBEFC_u1DbxuFF5FZvSxPL";
const timeout = 2000;

const wait = util.promisify(setTimeout);

const start = async () => {
    const startTime = Date.now();
    const client = new Genius.Client(token);

    const searches = await client.songs.search("faded");

    const firstSong = searches[0];
    console.log("First song:");
    console.log(firstSong);
    await wait(timeout);

    const SongWID = await client.songs.get(firstSong.id);
    console.log("\nWith ID:");
    console.log(SongWID);
    await wait(timeout);

    const sidlyrics = await firstSong.lyrics();
    console.log(`\nLyrics of ${firstSong.title}:`);
    console.log(sidlyrics);
    await wait(timeout);

    const artist = firstSong.artist;
    console.log(`\nAbout ${artist.name}:`);
    console.log(artist);
    await wait(timeout);

    const againArtistNo = 456537;
    const againArtist = await client.artists.get(againArtistNo);
    console.log(`\nAbout Artist ${againArtistNo}:`);
    console.log(againArtist);

    console.log(`\nCompleted in ${Date.now() - startTime}ms`);
};

start();

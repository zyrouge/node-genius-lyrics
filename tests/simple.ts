import Genius, { Constants } from "../dist";
import * as util from "util";

const Token = "GjZdsQku4iZ7k9QRw0v3g2PRBRe6zrAe3NzPLBqdA-fBEFC_u1DbxuFF5FZvSxPL";
const Client = new Genius.Client(Token);
const Config = {origin: {api: Constants.BASE_URL, url: 'https://genius.com'}};
const ClientWithConfig = new Genius.Client(Token, Config);
const wait = util.promisify(setTimeout);

const test = async () => {
    const startTime = Date.now();
    const searches = await Client.songs.search("faded");

    const firstSong = searches[0];
    console.log("First song:");
    console.log(firstSong);
    await wait(1000);

    const lyrics = await firstSong.lyrics();
    console.log(`\nLyrics of ${firstSong.title}:`);
    console.log(lyrics);
    await wait(1000);

    const artist = firstSong.artist;
    console.log(`\nAbout ${artist.name}:`);
    console.log(artist);
    await wait(1000);

    const againArtistNo = 456537;
    const againArtist = await Client.artists.get(againArtistNo);
    console.log(`\nAbout Artist ${againArtistNo}:`);
    console.log(againArtist);

    const searchesWithConfig = await ClientWithConfig.songs.search("faded");
    console.log("Number of songs found with custom config:");
    console.log(searchesWithConfig.length);

    console.log(`\nCompleted in ${Date.now() - startTime}ms`);
};

test();
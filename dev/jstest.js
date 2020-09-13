const Genius = require("..");
const Token = "GjZdsQku4iZ7k9QRw0v3g2PRBRe6zrAe3NzPLBqdA-fBEFC_u1DbxuFF5FZvSxPL";
const Client = new Genius.Client(Token);

let intervals = 0;
const wait = (time) => new Promise((resolve) => {
    setTimeout(() => {
        intervals += 1;
        console.log("Pausing... (to avoid ratelimiting)\n");
        resolve();
    }, time);
});

const test = async () => {
    const startTime = Date.now();

    console.log(`Genius-Lyrics v${Genius.Version}`);

    const searches = await Client.songs.search("faded");

    // Lets see the first song
    const firstSong = searches[0];
    console.log("About the Song:\n", firstSong, "\n");
    await wait(1000);

    // Ok lets get the lyrics
    const lyrics = await firstSong.lyrics();
    console.log("Lyrics of the Song:\n", lyrics, "\n");
    await wait(1000);

    // Ok look about the Artist
    const artist = firstSong.artist;
    console.log("About the Artist:\n", artist, "\n");
    await wait(1000);

    // Again...
    const againArtist = await Client.artists.get(456537);
    console.log("About the Artist (Again):\n", againArtist, "\n");

    // Done
    console.log(`Completed fetching in ${Date.now() - startTime}ms in ${intervals} intervals`);
}

test();
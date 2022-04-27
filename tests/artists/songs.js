const test = require("ava");
const { Client, wait } = require("..");

const id = 456537;

test("Artist Client - Songs", async (t) => {
    const artist = await Client.artists.get(id);
    const songs = await artist.songs();
    t.not(songs.length, 0);
    await wait.default();
});

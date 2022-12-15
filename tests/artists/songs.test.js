const test = require("ava");
const { AuthorizedClient, wait } = require("..");

const id = 456537;

test("[Authorized] Artist Client - Songs", async (t) => {
    const artist = await AuthorizedClient.artists.get(id);
    const songs = await artist.songs();
    t.not(songs.length, 0);
    await wait.default();
});

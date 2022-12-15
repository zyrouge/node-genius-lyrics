const test = require("ava");
const { AuthorizedClient, wait } = require("..");

const id = 456537;

test("[Authorized] Song Client - ID & Lyrics", async (t) => {
    const song = await AuthorizedClient.songs.get(id);
    t.is(song.id, id);
    await wait.default();

    const lyrics = await song.lyrics();
    t.true(typeof lyrics === "string" && lyrics.length > 0);
});

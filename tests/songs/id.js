const test = require("ava");
const { Client, wait } = require("..");

const id = 456537;

test("Song Client - ID & Lyrics", async (t) => {
    const song = await Client.songs.get(id);
    t.is(song.id, id);
    await wait.default();

    const lyrics = await song.lyrics();
    t.true(typeof lyrics === "string" && lyrics.length > 0);
});

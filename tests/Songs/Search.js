const test = require("ava");
const { Client, wait } = require("..");

test("Song Client - Search", async (t) => {
    const [song] = await Client.songs.search("faded");
    t.true(song.partial);
    await wait.default();

    await song.fetch();
    t.false(song.partial);
});

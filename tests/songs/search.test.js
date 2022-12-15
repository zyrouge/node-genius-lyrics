const test = require("ava");
const { AuthorizedClient, UnauthorizedClient, wait } = require("..");

test("[Authorized] Song Client - Search & Fetch", async (t) => {
    const [song] = await AuthorizedClient.songs.search("faded");
    t.true(song.partial);
    await wait.default();

    await song.fetch();
    t.false(song.partial);
});

test("[Unauthorized] Song Client - Search & Lyrics", async (t) => {
    const [song] = await UnauthorizedClient.songs.search("faded");
    t.true(song.partial);
    await wait.default();

    const lyrics = await song.lyrics();
    t.true(typeof lyrics === "string" && lyrics.length > 0);
});

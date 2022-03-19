const test = require("ava");
const { Client, wait } = require("..");

const id = 456537;

test("Artist Client - ID", async (t) => {
    const artist = await Client.artists.get(id);
    t.is(artist.id, id);
    await wait.default();
});

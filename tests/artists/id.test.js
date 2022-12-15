const test = require("ava");
const { AuthorizedClient, wait } = require("..");

const id = 456537;

test("[Authorized] Artist Client - ID", async (t) => {
    const artist = await AuthorizedClient.artists.get(id);
    t.is(artist.id, id);
    await wait.default();
});

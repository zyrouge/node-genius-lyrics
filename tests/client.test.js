const test = require("ava");
const Genius = require("../dist");
const { AuthorizedClient, UnauthorizedClient } = require(".");

test("Genius Client", (t) => {
    t.true(AuthorizedClient instanceof Genius.Client);
    t.true(UnauthorizedClient instanceof Genius.Client);
});

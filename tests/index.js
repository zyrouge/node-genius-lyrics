const test = require("ava");
const Genius = require("../dist");
const util = require("util");

const __token__ =
    "GjZdsQku4iZ7k9QRw0v3g2PRBRe6zrAe3NzPLBqdA-fBEFC_u1DbxuFF5FZvSxPL";

const wait = util.promisify(setTimeout);

module.exports = {
    AuthorizedClient: new Genius.Client(__token__),
    UnauthorizedClient: new Genius.Client(),
    wait: {
        _: wait,
        default: () => wait(2000),
    },
};

test("Genius Client", (t) => {
    t.true(module.exports.AuthorizedClient instanceof Genius.Client);
    t.true(module.exports.UnauthorizedClient instanceof Genius.Client);
});

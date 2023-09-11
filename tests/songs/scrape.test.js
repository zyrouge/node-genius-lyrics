const test = require("ava");
const Genius = require("../../dist");
const { UnauthorizedClient } = require("..");

const url = "https://genius.com/Alan-walker-faded-lyrics";

test("[Unauthorized] Song Client - Scrape & Lyrics", async (t) => {
    const song = await UnauthorizedClient.songs.scrape(url);
    t.true(song instanceof Genius.ScrapedSong);

    const lyrics = song.lyrics();
    t.true(typeof lyrics === "string" && lyrics.length > 0);
});

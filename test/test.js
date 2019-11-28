const genius = require("genius-lyrics");
const Genius = new genius.Client('your-genius-token-here');

async function test () {
  const search = await Genius.findTrack('song-name');
  const url = await Genius.getUrl(search);
  const lyricsJSON = await Genius.getLyrics(url);
  const lyrics = lyricsJSON.lyrics;
  console.log(lyrics);
};

test();

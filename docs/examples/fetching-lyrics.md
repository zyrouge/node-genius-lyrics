### Based on `.then`
```js
const Genius = new (require("genius-lyrics"))("your-token-here");

Genius.tracks.search("faded")
.then(results => {
    const song = results[0];
    song.lyrics()
    .then(lyrics => {
        console.log(lyrics);
    })
})
.catch(err => console.error(err));
```

### Based on `Async/Await`
```js
const Genius = new (require("genius-lyrics"))("your-token-here");

async function lyrics() {
     try {
          const song = await Genius.tracks.search("faded")[0];
          const lyrics = await song.lyrics();
          console.log(lyrics);
     } catch(e) {
          console.log(e);
     }
}

lyrics();
```

### Based on `.then`
```js
const Genius = new (require("genius-lyrics"))("your-token-here");

Genius.artists.get("653414")
.then(artist => {
    console.log(artist);
})
.catch(err => console.error(err));
```

### Based on `Async/Await`
```js
const Genius = new (require("genius-lyrics"))("your-token-here");

async function getArtist() {
     try {
          const artist = await Genius.artists.get("653414");
          console.log(artist);
     } catch(e) {
          console.log(e);
     }
}

getArtist();
```

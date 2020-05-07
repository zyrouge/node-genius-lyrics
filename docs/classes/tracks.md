## Tracks
Represents an Array of Genius Tracks.

#### Methods
* [random](#random)

#### Properties
* [size](#size)

---

## Methods

### random

Usage: `.random()`

Gives a Random Track from Tracks.

Returns: `<Track>`

Example:
```js
Genius.tracks.search('ignite')
.then(songs => console.log(songs.random()))
.catch(e => console.error(e));
```

---

## Properties
### size

Usage: `.size`

Number of Tracks in Tracks.

Returns: `number`

Example:
```js
Genius.tracks.search('ignite')
.then(songs => console.log(songs.size))
.catch(e => console.error(e));
```

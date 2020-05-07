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

Returns: [track](classes/track.md)

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

Returns: [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) 

Example:
```js
Genius.tracks.search('ignite')
.then(songs => console.log(songs.size))
.catch(e => console.error(e));
```

## Client#Tracks
Represents Genius Tracks Methods and Properties.

#### Methods
* [search](#search)
* [get](#get)

---

## Methods

### search

Usage: `.search(song, options)`

Searches the Song in Genius API

Parameter | Type | Description
----------|------|------------
`song` | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | Search terms
`options` | [trackOptions](options/tracks) | Extra Options for convenience

Returns: [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) { [Tracks](/classes/tracks) }

Example:
```js
Genius.tracks.search('faded')
.then(songs => console.log(songs))
.catch(e => console.error(e));
```

### get

Usage: `.get(id)`

Searches the song for the Corresponding ID in API

Parameter | Type | Description
----------|------|------------
`id` | string or number | ID of a Song in Genius

Returns: [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) { [Track](/classes/track) }

Example:
```js
Genius.tracks.get('62711')
.then(song => console.log(song))
.catch(e => console.error(e));
```

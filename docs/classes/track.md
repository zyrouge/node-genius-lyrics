## Track
Represents a Genius Track.

#### Methods
* [lyrics](#lyrics)

#### Properties
* [title](#title)
* [titles](#titles)
* [id](#id)
* [thumbnail](#thumbnail)
* [image](#image)
* [url](#url)
* [artist](#artist)
* [album](#album)
* [releasedAt](#releasedAt)
* [stats](#stats)
* [featured](#featured)
* [raw](#raw)

---

## Methods

### lyrics

Usage: `.lyrics()`

Returns the Lyrics of the Song.

Returns: [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) { [lyrics](objects/lyrics) }

Example:
```js
Genius.tracks.get('62711')
.then(song => console.log(song.lyrics()))
.catch(e => console.error(e));
```

---

## Properties

### title

Usage: `.title`

Represents Title of a Track.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### titles

Usage: `.titles`

Represents Additional Titles of a Track.

Returns: [titles](https://github.com/zyrouge/genius-lyrics/wiki/Titles)

### id

Usage: `.id`

Represents ID of a Track.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

### thumbnail

Usage: `.thumbnail`

Represents Thumbnail(png) URL of a Track.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### image

Usage: `.image`

Represents Image(png) URL of a Track.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### url

Usage: `.url`

Represents Genius URL of a Track.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### artist

Usage: `.artist`

Represents Artist of a Track.

Returns: [artist](classes/artist)

### album

Usage: `.album`

Represents Album of a Track.

Returns: [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

### releasedAt

Usage: `.releasedAt`

Represents Release Date of a Track.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### stats

Usage: `.stats`

Represents Stats of a Track.

Returns: [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

### featured

Usage: `.featured`

Whether the Track is featured or not.

Returns: [boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

### raw

Usage: `.raw`

Represents Raw Response from Genius.

Returns: [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

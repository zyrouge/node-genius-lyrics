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

Returns: `Promise {<Lyrics>}`

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

Returns: `string`

### titles

Usage: `.titles`

Represents Additional Titles of a Track.

Returns: [Titles](https://github.com/zyrouge/genius-lyrics/wiki/Titles)

### id

Usage: `.id`

Represents ID of a Track.

Returns: `string | number`

### thumbnail

Usage: `.thumbnail`

Represents Thumbnail(png) URL of a Track.

Returns: `string`

### image

Usage: `.image`

Represents Image(png) URL of a Track.

Returns: `string`

### url

Usage: `.url`

Represents Genius URL of a Track.

Returns: `string`

### artist

Usage: `.artist`

Represents Artist of a Track.

Returns: `<Artist>`

### album

Usage: `.album`

Represents Album of a Track.

Returns: `object`

### releasedAt

Usage: `.releasedAt`

Represents Release Date of a Track.

Returns: `string`

### stats

Usage: `.stats`

Represents Stats of a Track.

Returns: `object`

### featured

Usage: `.featured`

Whether the Track is featured or not.

Returns: `boolean`

### raw

Usage: `.raw`

Represents Raw Response from Genius.

Returns: `object`

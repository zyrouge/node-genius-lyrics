## Artist
Represents a Genius Artist.

#### Methods
* [songs](#songs)

#### Properties
* [name](#name)
* [id](#id)
* [url](#url)
* [thumbnail](#thumbnail)
* [image](#image)
* [nicknames](#nicknames)
* [iq](#iq)
* [socialmedia](#socialmedia)
* [verified](#verified)
* [user](#user)
* [raw](#raw)

---

## Methods

### songs

Usage: `.songs(options)`

Parameter | Type | Description
----------|------|------------
`options` | [artistSongOptions](options/artist-songs) | Artist Song Options

Returns an Array of Songs by the Artist.

Returns: [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) { [tracks](classes/tracks) }

Example:
```js
Genius.artists.get('653414')
.then(async artist => console.log(await artist.songs()))
.catch(e => console.error(e));
```

---

## Properties

### name

Usage: `.name`

Represents Name of the Artist.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### id

Usage: `.id`

Represents ID of a Artist.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

### url

Usage: `.url`

Represents Genius URL of a Artist.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### thumbnail

Usage: `.thumbnail`

Represents Thumbnail(png) URL of a Artist.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### image

Usage: `.image`

Represents Image(png) URL of a Artist.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

### nicknames

Usage: `.nicknames`

Represents Nicknames of a Artist.

Returns: [array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

### iq

Usage: `.iq`

Represents IQ of a Artist.

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

### socialmedia

Usage: `.socialmedia`

Represents Social Media URLs of a Artist.

Returns: [Social Media](https://github.com/zyrouge/genius-lyrics/wiki/Social-Media)

### verified

Usage: `.verified`

Represents Verified State of a Artist.

Returns: [Verified](https://github.com/zyrouge/genius-lyrics/wiki/Verified)

### user

Usage: `.user`

Represents the User object of a Artist.

Returns: [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

### raw

Usage: `.raw`

Represents Raw Response from Genius.

Returns: [object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)

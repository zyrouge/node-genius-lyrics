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
`options` | [artistSongOptions](https://github.com/zyrouge/genius-lyrics/wiki/Options-(Artist-Songs)) | Artist Song Options

Returns an Array of Songs by the Artist.

Returns: `Promise {<Tracks>}`

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

Returns: `string`

### id

Usage: `.id`

Represents ID of a Artist.

Returns: `string | number`

### url

Usage: `.url`

Represents Genius URL of a Artist.

Returns: `string`

### thumbnail

Usage: `.thumbnail`

Represents Thumbnail(png) URL of a Artist.

Returns: `string`

### image

Usage: `.image`

Represents Image(png) URL of a Artist.

Returns: `string`

### nicknames

Usage: `.nicknames`

Represents Nicknames of a Artist.

Returns: `array`

### iq

Usage: `.iq`

Represents IQ of a Artist.

Returns: `string | number`

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

Returns: `object`

### raw

Usage: `.raw`

Represents Raw Response from Genius.

Returns: `object`

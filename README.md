# Genius Lyrics

###### Made by ZYROUGE

<center>

[![Genius Lyrics by ZYROUGE](https://cdn.glitch.com/11b29f21-918a-49bd-83fa-985f9d7e114e%2Fbanner.png?v=1575086917366)](https://zyrouge.tech/)

<br>

[![NPM](https://nodei.co/npm/genius-lyrics.png)](https://nodei.co/npm/genius-lyrics/)

</center>

## Table of Contents

* [Installing](#Installing)
* [Things Needed](#Things-Needed)
* [Declaring & Creating a Client](#Declaring--Creating-a-Client)
* [Searching in Genius](#Searching-in-Genius)
* [Getting Genius URL](#Getting-Genius-URL)
* [Getting Lyrics with the URL](#Getting-Lyrics-with-the-URL)
* [Get Genius Song ID](#Get-Genius-Song-ID)
* [Get Genius Song by ID](#Get-Genius-Song-by-ID)
* [Get Genius Artist by ID](#Get-Genius-Artist-by-ID)
* [Get Genius Artist Songs by ID](#Get-Genius-Artist-Songs-by-ID)
* [Full Code](#Full-Code)
* [Getting all the Song Info](#Getting-all-the-Song-Info)
* [Fetching from API](#Fetching-from-API)
* [Need Help?](#Need-Help)

## Installing

Run the Below Code in Terminal/CMD

```bash
npm i genius-lyrics
```

## Things Needed

* Module: `genius-lyrics`
* Genius Token: [Get Genius Token at here](https://genius.com/developers)
* Basic NodeJS Skills

## Declaring & Creating a Client

```js
const genius = require("genius-lyrics");
const Genius = new genius.Client('your-genius-token-here');
```

## Searching in Genius

```js
const search = await Genius.findTrack('song-name');
```

The Result will be a Array of Song Objects.

## Getting Genius URL

* Without a Specific Song in Array

```js
const url = await Genius.getUrl(search);
```

* With a Specific Song in Array

```js
const url = await Genius.getUrl(search, 3);
```

## Getting Lyrics with the URL

```js
const lyricsJSON = await Genius.getLyrics(url);
const lyrics = lyricsJSON.lyrics;
```

## Get Genius Song ID

```js
const id = await Genius.getId(search);
```

## Get Genius Song by ID

```js
const id = await Genius.findTrackByID(id);
```

## Get Genius Artist by ID

```js
const id = await Genius.findArtistByID(id);
```

## Get Genius Artist Songs by ID

```js
const id = await Genius.findArtistSongsByID(id, 20 /* Results per page */, 2 /* Page Number*/);
```

## Full Code

```js
const genius = require("genius-lyrics");
const Genius = new genius.Client('your-genius-token-here');
const search = await Genius.findTrack('song-name');
const url = await Genius.getUrl(search);
const lyricsJSON = await Genius.getLyrics(url);
const lyrics = lyricsJSON.lyrics;

console.log(lyrics);
```

## Getting all the Song Info

```js
const genius = require("genius-lyrics");
const Genius = new genius.Client('your-genius-token-here');
const search = await Genius.findTrack('song-name');
const all = await Genius.getAll(search);

console.log(all);
```

**Note:** It needs a Async Function to Work or you'll be stuck with Promise returns.

## Fetching from API

This is completely Optional Feature.

```js
const genius = require("genius-lyrics");
const Genius = new genius.Client('your-genius-token-here');
const custom = await Genius.request(`the-genius-endpoint-with-queries?q=your-queries`);

console.log(custom);
```

Read the [Genius Docs](https://docs.genius.com/) for the Endpoints.

## Need Help

Open a Issue or join our [Discord Server](https://discordapp.com/invite/8KV5zCg) for help!

[**Zyrouge Development**](https://dev.zyrouge.tech) | [**ZYROUGE**](https://dev.zyrouge.tech) | [**NPM**](https://www.npmjs.com/package/genius-lyrics)

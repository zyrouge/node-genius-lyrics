# Genius Lyrics

### Created by ZYROUGE

[![NPM](https://nodei.co/npm/genius-lyrics.png)](https://nodei.co/npm/genius-lyrics/)

## Table of Contents

* [Installing](#Installing)
* [Things Needed](#Things-Needed)
* [Declaring & Creating a Client](#Declaring--Creating-a-Client)
* [Searching in Genius](#Searching-in-Genius)
* [Getting Genius URL](#Getting-Genius-URL)
* [Getting Lyrics with the URL](#Getting-Lyrics-with-the-URL)
* [Get Genius Song ID](#Get-Genius-Song-ID)
* [Full Code](#Full-Code)
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

**Note:** It needs a Async Function to Work or you'll be stuck with Promise returns.

## Need Help

Open a Issue or join our [Discord Server](https://discordapp.com/invite/8KV5zCg) for help!

[**Zyrouge Development**](https://dev.zyrouge.tech) | [**ZYROUGE**](https://dev.zyrouge.tech) | [**NPM**](https://www.npmjs.com/package/genius-lyrics)

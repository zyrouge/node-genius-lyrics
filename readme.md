<h1 align="center">Genius Lyrics 🎵</h1>

[![Node.js CI](https://github.com/zyrouge/genius-lyrics/actions/workflows/ci.yml/badge.svg?branch=master)](https://github.com/zyrouge/genius-lyrics/actions/workflows/ci.yml)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fzyrouge%2Fgenius-lyrics.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fzyrouge%2Fgenius-lyrics?ref=badge_shield)
[![Documentation](https://github.com/zyrouge/genius-lyrics/actions/workflows/docs.yml/badge.svg)](https://github.com/zyrouge/genius-lyrics/actions/workflows/docs.yml)

## 🤔 Whats is this?

Just a simple lyrics fetcher that uses [Genius](https://genius.com). This also has official API implementations.

## 💻 Installation

```
npm install genius-lyrics
```

## ⚙️ Usage

```js
const Genius = require("genius-lyrics");
const Client = new Genius.Client("top-secret-optional-key");
```

## 📎 Links

- [Documentation](https://genius-lyrics.js.org/)
- [NPM](https://npmjs.com/genius-lyrics)
- [GitHub](https://github.com/zyrouge/genius-lyrics)

## ✏️ Examples

### Requiring

**JavaScript**

```js
const Genius = require("genius-lyrics");
const Client = new Genius.Client("top-secret-optional-key"); // Scrapes if no key is provided
```

**TypeScript**

```ts
import Genius from "genius-lyrics";
const Client = new Genius.Client("top-secret-optional-key"); // Scrapes if no key is provided
```

### Fetching a Song and Lyrics

```js
const searches = await Client.songs.search("faded");

// Pick first one
const firstSong = searches[0];
console.log("About the Song:\n", firstSong, "\n");

// Ok lets get the lyrics
const lyrics = await firstSong.lyrics();
console.log("Lyrics of the Song:\n", lyrics, "\n");
```

### Fetching an Artist

```js
const artist = await Client.artists.get(456537);
console.log("About the Artist:\n", artist, "\n");
```

<br>

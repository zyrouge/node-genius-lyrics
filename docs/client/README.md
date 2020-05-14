## Creating an Actual Client
### v3+
#### Javascript
```js
const genius = require("genius-lyrics");
const Genius = new genius.Client('your-genius-token');
```
#### Typescript
```js
import Genius from "genius-lyrics";
const Genius = new genius.Client('your-genius-token');
```

### Below v3+
* **Method 1**
```js
const genius = require("genius-lyrics");
const Genius = new genius.Client('your-genius-token');
```
* **Method 2**
```js
const genius = require("genius-lyrics");
const Genius = new genius('your-genius-token');
```
Visit [Genius Developers Page](https://genius.com/developers) for a Token

---

#### Properties
* [tracks](client/tracks)
* [artists](client/artists)
* [key](#key)
* [version](#version)

#### Methods
* [fetcher](#fetcher)

---

## Properties

### key

Usage: `.key`

Genius Lyrics Client's API Key

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

Example:
```js
console.log(Genius.key)
```

### version

Usage: `.version`

Genius Lyrics Package Version

Returns: [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)

Example:
```js
console.log(Genius.version)
```

---

## Methods

### fetcher

Usage: `.fetcher(endpoint)`

Fetches the Endpoint

***Note: This is only for Advanced-Usage***

Parameter | Type | Description
----------|------|------------
`endpoint` | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) | Fetches using *node-fetch*. Refer [this](https://docs.genius.com/)

Returns: [Promise { pending }](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)

Example:
```js
Genius.fetcher('https://api.genius.com/search?q=faded')
.then(res => console.log(res))
.catch(e => console.error(e));
```

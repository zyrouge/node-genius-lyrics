## Client#Artists
Represents Genius Artists Methods and Properties.

#### Methods
* [get](#get)

---

## Methods

### get

Usage: `.get(id)`

Searches the artist for the Corresponding ID in API

Parameter | Type | Description
----------|------|------------
`id` | [string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) or [number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number) | ID of a Artist in Genius

Returns: [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) { [Artist](/classes/artist) }

Example:
```js
Genius.artists.get('62711')
.then(artist => console.log(artist))
.catch(e => console.error(e));
```

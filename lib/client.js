const fetch = require("node-fetch");
const cheerio = require('cheerio');
const url = 'https://api.genius.com';

class Client {

  constructor(key) {

    /**
    * Creates a Client
    * @constructor
    * @params { string } Genius Key
    * @author { zyrouge.tech } ZYROUGE
    * @returns Lyrics
    */

    if(!key) throw new Error('No Genius Key was Provided!');
    this.key = key;
}

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Track
  */

  async findTrack(q) {
    const result = await this.request(`/search?q=${q}`);
    return result;
  }

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Track from ID
  */

  async findTrackByID(q) {
    if(!q || isNaN(q)) {
      throw new Error('ID should only be a Number');
    } else {
      const result = await this.request(`/songs/${q}`);
      return result;
    }
  }

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Track URL
  */

  async getUrl(q, pos = 0) {
    if (q && q.response && q.response.hits[pos]) {
      return q && q.response && q.response.hits[pos].result.url;
    } else {
      throw new Error("Invaild Song Object.")
    }
    return hit;
  }

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Track ID
  */

  async getId(q, pos = 0) {
    if (q && q.response && q.response.hits[pos]) {
      return q && q.response && q.response.hits[pos].result.id;
    } else {
      throw new Error("Invaild Song Object.")
    }
    return hit;
  }

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Track Informations (title, image, id, url) and Lyrics
  */

  async getAll(q, pos = 0) {
    const url = await this.getUrl(q, pos);
    if (q && q.response && q.response.hits[pos] && url) {
      const info = q && q.response && q.response.hits[pos].result;
      const lyrics = await this.loadLyrics(url);
      return {
        result: 200,
        ...info,
        lyrics: lyrics
      }
    } else {
      return {
        result: 0
      }
    }
  }

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Artist from ID
  */

  async findArtistByID(q) {
    if(!q || isNaN(q)) {
      throw new Error('ID should only be a Number');
    } else {
      const result = await this.request(`/artists/${q}`);
      return result;
    }
  }

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Artist Songs from ID
  */

  async findArtistSongsByID(q, per_page = 20, page = 1) {
    if(!q || isNaN(q)) {
      throw new Error('ID should only be a Number');
    } else if(!per_page || isNaN(per_page)) {
      throw new Error('Per Page should only be a Number');
    } else if(!page || isNaN(page)) {
      throw new Error('Page Number should only be a Number');
    } else {
      const result = await this.request(`/artists/${q}/songs?page=${page}&per_page=${per_page}`);
      if(result && result.meta && result && result.meta.status == 200 && result.response.songs) {
        return result.response.songs;
      } else {
        return {
          result: 0,
          message: "No Results were Found!"
        }
      }
    }
  }

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Lyrics
  */

  async getLyrics(url) {
    if (url) {
      const lyrics = await this.loadLyrics(url);
      return {
        result: 200,
        lyrics: lyrics
      }
    } else {
      return {
        result: 0
      }
    }
  }

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Track Lyrics
  */

  async loadLyrics(url) {
    return fetch(url).then(async r => {
      const _ = await r.text()
      const $ = cheerio.load(_)
      return $('.lyrics') ? $('.lyrics').text().trim() : null
    })
  }

  /**
  * Genius API Starts Here
  * @requires { string } Genius Key
  * @author { zyrouge.tech } ZYROUGE
  * @returns Genius Custom Request
  */

  async request(endpoint) {
    return fetch(url + endpoint, {
      headers: { 'Authorization': `Bearer ${this.key}` }
    }).then(res => res.json())
  }

};

module.exports = Client;

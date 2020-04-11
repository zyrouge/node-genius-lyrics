const fetch = require("node-fetch");
const cheerio = require("cheerio");
const Artist = require("./Artist");

class Track {
    constructor(t, options = {}) {
        this.title = t.title || null;
        this.titles = {
            full: t.full_title || null,
            featured: t.title_with_featured || null
        };
        this.id = t.id || null;
        this.thumbnail = t.header_image_thumbnail_url || null;
        this.image = t.header_image_url || null;
        this.url = t.url || null;
        this.artist = t.primary_artist ? new Artist(t.primary_artist, options) : null;
        this.album = t.album || null;
        this.releasedAt = t.release_date || null;
        this.stats = t.stats || null;
        this.featured = !!t.featured_video || false;
        this.raw = t || null;
    }

    async lyrics() {
        return new Promise((resolve, reject) => {
            if(this.url == null) resolve(null);
            fetch(this.url)
            .then(async r => {
                const _ = await r.text()
                const $ = cheerio.load(_)
                resolve($('.lyrics') ? $('.lyrics').text().trim() : null)
            })
            .catch(e => reject(e));
        });
    }
}

module.exports = Track;
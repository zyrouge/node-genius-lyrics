class Tracks extends Array {
    constructor() {
        super();
    }

    random() {
        return this[Math.floor(Math.random() * this.length)];
    }

    size() {
        return this.length;
    }
}

module.exports = Tracks;
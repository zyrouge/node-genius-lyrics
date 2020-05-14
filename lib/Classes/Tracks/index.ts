class Tracks extends Array {
    constructor() {
        super();
    }

    random(): any {
        return this[Math.floor(Math.random() * this.length)];
    }

    size(): number {
        return this.length;
    }
}

export default Tracks;
export class NoResultError extends Error {
    constructor() {
        super("No result was found");
    }
}

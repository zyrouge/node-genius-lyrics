export class InvalidDataError extends Error {
    constructor() {
        super("Received invalid response data");
    }
}
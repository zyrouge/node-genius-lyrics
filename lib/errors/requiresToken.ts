export class RequiresGeniusKeyError extends Error {
    constructor() {
        super("This action requires a valid Genius Token");
    }
}
export class WithMessageError extends Error {
    constructor(err: any, msg: any) {
        super(`Returned ${err} with message: ${msg}`);
    }
}
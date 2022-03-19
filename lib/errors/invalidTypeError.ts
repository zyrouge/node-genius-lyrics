export class InvalidTypeError extends Error {
    constructor(name: string, expected: string, received: string) {
        super(
            `"${name}" must be a type of "${expected}" but received type of "${received}".`
        );
    }
}

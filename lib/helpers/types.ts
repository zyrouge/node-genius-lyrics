export const isNull = (data: any): data is null => data === null;

export const isUndefined = (data: any): data is undefined => data === undefined;

export const isString = (data: any): data is string => typeof data === "string";

export const isNumber = (data: any): data is string =>
    typeof data === "number" && !isNaN(data);

export const isBoolean = (data: any): data is string =>
    typeof data === "boolean";

export const isNumberOrNaN = (data: any): data is string =>
    typeof data === "number";

export const isObject = (data: any): data is any =>
    !isNull(data) && typeof data === "object";

export const isArray = (data: any): data is any[] => Array.isArray(data);

export const joinTypes = (...types: string[]) =>
    types.map((x) => `'${x}'`).join(" | ");

export const contentBetween = (data: string, start: string, end: string) => {
    return data.split(start, 2)[1]?.split(end, 1)[0];
};

const jsonEscapedRegex = /\\['"\\]/g;
const jsonEscapedReplacements: Record<string, string> = {
    "\\'": "'",
    '\\"': '"',
    "\\\\": "\\",
};

export const unescapeJsonEscaped = (data: string) => {
    return data.replaceAll(
        jsonEscapedRegex,
        (m) => jsonEscapedReplacements[m]!
    );
};

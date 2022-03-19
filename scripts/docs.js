const { promises: { writeFile } } = require("fs");
const { join } = require("path");

const URL = "genius-lyrics.js.org";

const start = async () => {
    const cnamedir = join(__dirname, "../docs/CNAME");

    await writeFile(cnamedir, URL);

    console.log(`Wrote CNAME file to ${cnamedir} pointing to '${URL}'`);
};

start();

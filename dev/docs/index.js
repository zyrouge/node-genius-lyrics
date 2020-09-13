const jsdoc2md = require("jsdoc-to-markdown");
const path = require("path");
const fs = require("fs").promises;

const generate = async () => {
    const rendered = await jsdoc2md.render({
        files: [
            "index.js",
            "lib/*.js",
            "lib/**/*.js"
        ],
        noGfm: true,
        partial: __dirname + "/partials/**.hbs"
    });
    const docspath = path.join(__dirname, "..", "..", "..", "genius-lyrics-docs", "docs", "Documentation.md");
    await fs.writeFile(docspath, rendered, "utf8");

    console.log("Documentation generated");
}

generate();
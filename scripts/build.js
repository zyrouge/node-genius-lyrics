const { sync: rimraf } = require("rimraf");
const path = require("path");

const start = async () => {
    const startTime = Date.now();
    const buildDir = path.resolve(__dirname, "..", "dist");
    rimraf(buildDir);
    console.log(`Deleted previous build files from ${buildDir} in ${Date.now() - startTime}ms!`);
}

start();
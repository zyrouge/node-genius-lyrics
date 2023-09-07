const {
    promises: { rm },
} = require("fs");
const { join } = require("path");

const start = async () => {
    const startTime = Date.now();
    const buildDir = join(__dirname, "../dist");
    await rm(buildDir, {
        recursive: true,
        force: true,
    });
    console.log(
        `Deleted previous build files from ${buildDir} in ${
            Date.now() - startTime
        }ms!`
    );
};

start();

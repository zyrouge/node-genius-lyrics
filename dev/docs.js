const cp = require("child_process");
const util = require("util");
const exec = util.promisify(cp.exec);
const fs = require("fs");
const pkg = require("../package.json");

const docspath = `${__dirname}/../docs`;
const docscmd = "npm run docs";
const url = pkg.homepage.replace(/(https|http):\/\//, "");

const start = async () => {
    console.log(`Preparing for ${pkg.name}@${pkg.version}`);
    await exec(docscmd);
    console.log(`Generated docs using ${docscmd}`);
    fs.writeFileSync(`${docspath}/CNAME`, url);
    console.log(`Wrote CNAME pointing to ${url}`);
}

start();
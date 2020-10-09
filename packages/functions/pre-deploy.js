const fs = require("fs-extra");

const packageJsonPath = "./package.json";
const packageJson = require(packageJsonPath);

try {
    fs.rmdirSync(`./temp/shared`, { recursive: true });
} catch (e) { }
fs.copySync(`../shared`, `./temp/shared`);

packageJson.dependencies[ "@picsou/shared" ] = "file:./temp/shared";

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

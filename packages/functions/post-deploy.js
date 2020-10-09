const packageJsonPath = "./package.json";
const packageJson = require(packageJsonPath);
const fs = require("fs-extra");

try {
    fs.rmdirSync(`./temp/shared`, { recursive: true });
} catch (e) { }

delete packageJson.dependencies[ "@picsou/shared" ];

fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

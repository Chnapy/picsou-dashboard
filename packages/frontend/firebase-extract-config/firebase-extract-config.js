const path = require('path');
const fs = require('fs');

// Pass JSON config to .env.local file

const configFilePath = '../firebase.config.json';
const envFilePath = [ '.env.local', '.env.test.local' ];


try {
    const firebaseConfig = require(configFilePath);

    const stringifiedConfig = JSON.stringify(firebaseConfig);

    const content = `# Generated file, any edit will be lost.
REACT_APP_FIREBASE_CONFIG=${stringifiedConfig}
`;

    envFilePath.forEach(envPath => {
        fs.writeFileSync(path.resolve(envPath), content);
    });
} catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
        console.error('Error: File "firebase.config.json" is not present at path ' + path.resolve(configFilePath));
    }
    throw e;
}

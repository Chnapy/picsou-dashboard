
module.exports = {

    clearMocks: true,

    coverageDirectory: "coverage",

    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json",
            diagnostics: false
        }
    },

    testEnvironment: "node",

    testMatch: [
        "**/__tests__/**/*.ts",
        "**/?(*.)+(spec|test).ts"
    ],

    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
};

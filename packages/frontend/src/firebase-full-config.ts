
type FirebaseFullConfig = {
    projectName: string;
    authClientID: string;
    config: {
        apiKey: string;
        authDomain: string;
        databaseURL: string;
        projectId: string;
        storageBucket: string;
        messagingSenderId: string;
        appId: string;
        measurementId: string;
    };
};

const getFirebaseFullConfig = (): FirebaseFullConfig => {

    const configEnv = process.env.REACT_APP_FIREBASE_CONFIG;

    if (!configEnv) {
        const isProd = process.env.NODE_ENV === 'production';
        const isCI = process.env.CI;
        const message = isCI
            ? 'In CI env you have to set GitHub secret FIREBASE_CONFIG.'
            : (
                isProd
                    ? 'To run a build in local env you have to use firebase.config.json file.'
                    : 'In development/test env you have to use firebase.config.json file.'
            );
        throw new Error(`Env variable REACT_APP_FIREBASE_CONFIG is not defined. ${message} Check README for more.`);
    }

    return JSON.parse(configEnv);
};

export const firebaseFullConfig = getFirebaseFullConfig();

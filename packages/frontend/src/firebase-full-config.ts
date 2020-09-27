
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

    const configEnv = process.env.FIREBASE_CONFIG;
    if (configEnv) {
        return JSON.parse(configEnv);
    }

    try {
        return require('./firebase.config.json');
    } catch (e) {
        console.error('Env variable FIREBASE_CONFIG is not defined, and firebase.config.json is not present. You must put one of them.');
        throw e;
    }
};

export const firebaseFullConfig = getFirebaseFullConfig();

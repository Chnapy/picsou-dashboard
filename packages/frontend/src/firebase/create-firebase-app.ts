import * as firebase from "firebase/app";
import { firebaseFullConfig } from '../firebase-full-config';

const isProd = process.env.NODE_ENV === 'production';

console.log('NODE_ENV', process.env.NODE_ENV);

export const firebaseAuthClientID = '360932669439-0va9nbd861ttb9sju51poph48vbi6130.apps.googleusercontent.com';

export const createFirebaseApp = () => {

    const config = { ...firebaseFullConfig.config };

    if(!isProd) {
        config.databaseURL = "http://localhost:9000?ns=" + firebaseFullConfig.projectName;
    }

    firebase.initializeApp(config);

    if (!isProd) {
        firebase.functions().useFunctionsEmulator("http://localhost:5001");
    }
};

export const getFirebase = () => firebase;

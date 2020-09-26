import * as firebase from "firebase/app";

const isProd = process.env.NODE_ENV === 'production';

console.log('NODE_ENV', process.env.NODE_ENV);

export const firebaseAuthClientID = '360932669439-0va9nbd861ttb9sju51poph48vbi6130.apps.googleusercontent.com';

export const createFirebaseApp = () => {

    const databaseURL = isProd
        ? "https://picsou-dashboard.firebaseio.com"
        : "http://localhost:9000?ns=picsou-dashboard";

    // TODO remove from git
    // should be SECRET
    const firebaseConfig = {
        apiKey: "AIzaSyAVIyoVGl7IhtI0G8QwIXSGdjFzsvn4cXw",
        authDomain: "picsou-dashboard.firebaseapp.com",
        databaseURL,
        projectId: "picsou-dashboard",
        storageBucket: "picsou-dashboard.appspot.com",
        messagingSenderId: "360932669439",
        appId: "1:360932669439:web:5b9417189c8efcf9ac59ca",
        measurementId: "G-YC1FD409ZH"
    };

    firebase.initializeApp(firebaseConfig);

    if (!isProd) {
        firebase.functions().useFunctionsEmulator("http://localhost:5001");
    }
};

export const getFirebase = () => firebase;

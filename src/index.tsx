// should be first
import { createFirebaseApp } from './firebase/create-firebase-app';

import ReactDOM from 'react-dom';
import { createStoreManager } from './main/store-manager';
import { createView } from './main/view/view';
import * as serviceWorker from './serviceWorker';

console.log('Env variables', process.env);

const firebaseApp = createFirebaseApp();

const storeManager = createStoreManager({
    firebaseApp
});

const view = createView({ storeManager });

ReactDOM.render(view, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

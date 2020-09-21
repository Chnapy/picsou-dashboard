// should be first
import './firebase/firebase-imports';

import ReactDOM from 'react-dom';
import { createFirebaseApp } from './firebase/create-firebase-app';
import { createStoreManager } from './main/store-manager';
import { createView } from './main/view/view';
import * as serviceWorker from './serviceWorker';

console.log('Env variables', process.env);

createFirebaseApp();

const storeManager = createStoreManager({});

const view = createView({ storeManager });

ReactDOM.render(view, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

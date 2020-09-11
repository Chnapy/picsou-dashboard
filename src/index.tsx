import ReactDOM from 'react-dom';
import { createStoreManager } from './main/store-manager';
import { createView } from './main/view/view';
import * as serviceWorker from './serviceWorker';

const storeManager = createStoreManager({});

const view = createView({ storeManager });

ReactDOM.render(view, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

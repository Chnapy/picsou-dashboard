import * as firebaseTest from 'firebase-functions-test';

export const fbTester = firebaseTest({
    // databaseURL: 'https://my-project.firebaseio.com',
    // storageBucket: 'my-project.appspot.com',
    projectId: 'picsou-dashboard',
});

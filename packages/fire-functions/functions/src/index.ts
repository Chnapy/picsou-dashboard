import { routes } from '@picsou/shared';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { extractStockHistory } from './extractor/extract-stock-history';
import { extractStockSearch } from './extractor/extract-stock-search';

console.log('NODE_ENV', process.env.NODE_ENV);

const isTestEnv = process.env.NODE_ENV === 'test';

admin.initializeApp();

const needAuth = (fn: (data: any) => any) => async (data: any, { auth }: functions.https.CallableContext) => {

    if (isTestEnv) {
        return fn(data);
    }

    if (!auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }

    const dbWhiteList = admin.database().ref('/white-list-uid/' + auth.uid);
    const snapshot = await dbWhiteList.once('value');

    if (!snapshot.exists()) {

        await admin.auth().revokeRefreshTokens(auth.uid);
        await admin.auth().deleteUser(auth.uid);
        throw new functions.https.HttpsError('permission-denied', 'User UID not white-listed.');
    }

    return fn(data);
};

module.exports = {

    [ routes.stockHistory.name ]: functions.https.onCall(needAuth(routes.stockHistory.createFunction(extractStockHistory))),

    [ routes.stockSearch.name ]: functions.https.onCall(needAuth(routes.stockSearch.createFunction(extractStockSearch))),
};

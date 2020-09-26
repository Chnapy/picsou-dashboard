import { routes } from '@picsou/shared';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { extractStockHistory } from './extractor/extract-stock-history';
import { extractStockSearch } from './extractor/extract-stock-search';

console.log('NODE_ENV', process.env.NODE_ENV);

const appOptions: admin.AppOptions | undefined = process.env.NODE_ENV !== 'production'
    ? {
        ...JSON.parse(process.env.FIREBASE_CONFIG!),
        // hack to allow database use in dev
        databaseAuthVariableOverride: { admin: true }
    }
    : undefined;

admin.initializeApp(appOptions);

const needAuth = (fn: (data: any) => any) => async (data: any, { auth }: functions.https.CallableContext) => {
    if (!auth) {
        throw new functions.https.HttpsError('failed-precondition', 'The function must be called while authenticated.');
    }

    const dbWhiteList = admin.database().ref('/white-list-uid/' + auth.uid);
    const snapshot = await dbWhiteList.once('value');

    if (!snapshot.exists()) {

        // hack to allow function use in dev
        if (process.env.NODE_ENV !== 'production') {
            await dbWhiteList.set(true);

        } else {
            await admin.auth().revokeRefreshTokens(auth.uid);
            await admin.auth().deleteUser(auth.uid);
            throw new functions.https.HttpsError('permission-denied', 'User UID not white-listed.');
        }
    }

    return fn(data);
};

module.exports = {

    [ routes.stockHistory.name ]: functions.https.onCall(needAuth(routes.stockHistory.createFunction(extractStockHistory))),

    [ routes.stockSearch.name ]: functions.https.onCall(needAuth(routes.stockSearch.createFunction(extractStockSearch))),
};

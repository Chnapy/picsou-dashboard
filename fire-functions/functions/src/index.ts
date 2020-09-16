import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { getStockHistory } from './get-stock-history';

admin.initializeApp();

export const requestStockHistory = functions.https.onCall(async (query) => {
    console.log('query', query)
    return await getStockHistory(query);
});

import { add } from 'date-fns';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { dateToInvestingStr, BoardValueInfos, StockHistoryReqParams } from '@picsou/shared';
import { getStockHistory, GetStockHistoryReturn } from './get-stock-history';

admin.initializeApp();

export const requestStockHistory = functions.https.onCall(async (query) => {
    console.log('query', query)
    return await getStockHistory(query);
});

/**
 * returns each market name with there current value
 */
export const requestInitialMarketData = functions.https.onCall(async () => {

    // TODO get infos
    const stockInfos = [
        {
            id: 997026,
            name: 'Euro Stoxx 300',
            oldValueList: [
                {
                    oldValue: 171.25,
                    quantity: 4
                },
                {
                    oldValue: 174.78,
                    quantity: 8
                },
            ]
        },
        {
            id: 6408,
            name: 'Apple',
            oldValueList: [
                {
                    oldValue: 171.25,
                    quantity: 4
                },
                {
                    oldValue: 174.78,
                    quantity: 8
                },
            ]
        },
    ];

    const getHistoryForDate = (date: Date) => {
        const queries = stockInfos.map(({ id }): StockHistoryReqParams => ({
            pairId: id + '',
            startDate: dateToInvestingStr(add(date, { days: -7 })),
            endDate: dateToInvestingStr(date),
            interval: 'Daily'
        }));

        return Promise.all(queries.map(requestStockHistory.run));
    };

    const today = new Date();

    const histories: GetStockHistoryReturn[] = await getHistoryForDate(today);

    return stockInfos.map((infos, i): BoardValueInfos => {
        const [value] = histories[i].history;

        return {
            ...infos,
            board: 'market',
            quantityUnit: 'unit',
            currentValue: value.price
        };
    });
});

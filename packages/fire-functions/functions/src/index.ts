import { BoardValueInfos, fetchStockPropsToParams, routes } from '@picsou/shared';
import { add } from 'date-fns';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { extractStockHistory } from './extractor/extract-stock-history';

admin.initializeApp();

export const requestStockHistory = functions.https.onCall(routes.stockHistory.createFunction(async (query) => {
    console.log('query', query)
    return await extractStockHistory(query);
}));

/**
 * returns each market infos with there current value
 */
export const requestInitialMarketData = functions.https.onCall(routes.initialMarketData.createFunction(async () => {

    // TODO get infos
    const stockInfos: Pick<BoardValueInfos, 'id' | 'name' | 'oldValueList'>[] = [
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

    const getHistoryForDate = (endDate: Date) => {
        const query = fetchStockPropsToParams({
            pairId: stockInfos.map(infos => infos.id),
            startDate: add(endDate, { days: -7 }),
            endDate,
            interval: 'Daily'
        });

        return extractStockHistory(query);
    };

    const today = new Date();

    const histories = await getHistoryForDate(today);

    return stockInfos.map((infos, i): BoardValueInfos => {
        const [ value ] = histories[ i ].history;

        return {
            ...infos,
            board: 'market',
            quantityUnit: 'unit',
            currentValue: value.price
        };
    });
}));

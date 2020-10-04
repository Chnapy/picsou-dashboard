import { HistoryData } from './board';
import { GoldHistoryReqParams } from './gold';
import { FetchStockSearchDataItem, FetchStockSearchParams, StockHistoryReqParams } from './market';

export type FetchData<D> = {
    data: D;
};

const createRoute = <P = never, R = never>(name: string) => {

    return {
        name,
        createFunction: (fn: (params: P) => Promise<R>) => fn,
        createFetcher: (firebaseObj: { httpsCallable: (name: string) => unknown }) => {
            const fn = firebaseObj.httpsCallable(name);

            return fn as (params: P) => Promise<FetchData<R>>;
        }
    };
};

export const routes = {

    stockHistory: createRoute<StockHistoryReqParams, HistoryData[]>('requestStockHistory'),

    stockSearch: createRoute<FetchStockSearchParams, FetchStockSearchDataItem[]>('requestStockSearch'),

    goldHistory: createRoute<GoldHistoryReqParams, HistoryData[]>('requestGoldHistory'),

} as const;

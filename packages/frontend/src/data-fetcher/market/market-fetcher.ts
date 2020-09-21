import { FetchStockHistoryValuesProps, fetchStockPropsToParams, routes, StockHistoryValue } from '@picsou/shared';
import { add } from 'date-fns';
import { getFirebase } from '../../firebase/create-firebase-app';

export type FetchStockCurrentValueData = {
    pairId: number;
    currentValue: StockHistoryValue;
}[];

export const createMarketFetcher = () => {
    const fbFunctions = getFirebase().functions();

    const requestStockHistory = routes.stockHistory.createFetcher(fbFunctions);
    const requestInitialMarketData = routes.initialMarketData.createFetcher(fbFunctions);

    const fetchStockHistoryValues = async (props: FetchStockHistoryValuesProps) => {

        const params = fetchStockPropsToParams(props);

        return requestStockHistory(params);
    };

    return {

        fetchInitialMarketData: async () => {

            return requestInitialMarketData({});
        },

        fetchStockCurrentValue: async (pairIdList: number[]): Promise<FetchStockCurrentValueData> => {

            const endDate = new Date();

            const { data } = await fetchStockHistoryValues({
                pairId: pairIdList,
                startDate: add(endDate, { days: -1 }),
                endDate,
                interval: 'Daily'
            });

            return data.map(({ pairId, history }) => ({
                pairId,
                currentValue: history[ 0 ],
            }));
        },

        fetchStockHistoryValues,

        // TODO fetchStockSearch
    };
};

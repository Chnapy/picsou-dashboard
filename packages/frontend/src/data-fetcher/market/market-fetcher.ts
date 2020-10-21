import { FetchStockHistoryValuesProps, fetchStockPropsToParams, HistoryValue, routes } from '@picsou/shared';
import add from 'date-fns/add';
import { getFirebase } from '../../firebase/create-firebase-app';
import { createFetcher } from '../fetcher-types';

export type FetchStockCurrentValueData = {
    id: number;
    currentValue: HistoryValue;
}[];

export const createMarketFetcher = createFetcher(() => {
    const fbFunctions = getFirebase().functions();

    const requestStockHistory = routes.stockHistory.createFetcher(fbFunctions);
    const requestStockSearch = routes.stockSearch.createFetcher(fbFunctions);

    const fetchStockHistoryValues = async (props: FetchStockHistoryValuesProps) => {

        const params = fetchStockPropsToParams(props);

        return requestStockHistory(params);
    };

    return {

        fetchCurrentValue: async (pairIdList) => {

            const endDate = new Date();

            const { data } = await fetchStockHistoryValues({
                pairId: pairIdList,
                startDate: add(endDate, { days: -7 }),
                endDate,
                interval: 'Daily'
            });

            return data.map(({ id, history }) => ({
                id,
                currentValue: history[ 0 ],
            }));
        },

        fetchHistory: async (pairIdList) => {

            const endDate = new Date();

            const { data } = await fetchStockHistoryValues({
                pairId: pairIdList,
                startDate: add(endDate, { years: -1 }),
                endDate,
                interval: 'Daily'
            });

            return data;
        },

        fetchStockSearch: (search: string) => requestStockSearch({ search }),
    };
});

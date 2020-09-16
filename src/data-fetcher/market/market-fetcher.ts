import { format as dateFnsFormat } from 'date-fns';
import firebase from 'firebase';
import { FetchStockHistoryValuesProps, StockHistoryReqParams, StockHistoryValue } from '../../../shared/types/get-stock-history';

const dateToStr = (date: Date) => dateFnsFormat(date, 'MM/dd/yyyy');

export const createMarketFetcher = () => {
    const fbFunctions = firebase.functions();

    const getStockHistory = fbFunctions.httpsCallable('requestStockHistory');

    return {

        // TODO fetchStockCurrentValue

        fetchStockHistoryValues: async ({
            pairId, startDate, endDate, interval
        }: FetchStockHistoryValuesProps): Promise<{
            data: StockHistoryValue[];
        }> => {

            const params: StockHistoryReqParams = {
                pairId: pairId.toString(),
                startDate: dateToStr(startDate),
                endDate: dateToStr(endDate),
                interval,
            };

            return getStockHistory(params);
        },

        // TODO fetchStockSearch
    };
};

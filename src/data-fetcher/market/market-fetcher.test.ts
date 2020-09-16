import { getStockHistoryValuesTestData } from '../../../shared/tests/stock-history-values-test';
import { createMarketFetcher } from "./market-fetcher";

describe('# market-fetcher', () => {

    it('fetchStockHistoryValues', async () => {

        const fetcher = createMarketFetcher();

        const { paramsRaw, expectedData } = getStockHistoryValuesTestData();

        const { data } = await fetcher.fetchStockHistoryValues(paramsRaw);

        expect(data).toEqual(expectedData);
    });
});

import { getStockHistoryValuesTestData } from '../../../shared/tests/stock-history-values-test';
import { createMarketFetcher } from "./market-fetcher";

describe('# market-fetcher', () => {

    it('fetch initial market data', async () => {

        const fetcher = createMarketFetcher();

        const { data } = await fetcher.fetchInitialMarketData();

        expect(data).toEqual(expect.any(Array));
    });

    it('fetch stock-history-values', async () => {

        const fetcher = createMarketFetcher();

        const { paramsRaw, expectedData } = getStockHistoryValuesTestData();

        const { data } = await fetcher.fetchStockHistoryValues(paramsRaw);

        expect(data).toEqual({ history: expectedData });
    });
});

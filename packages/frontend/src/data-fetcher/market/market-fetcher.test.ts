import { getStockHistoryValuesTestData } from '@picsou/shared';
import { createMarketFetcher, FetchStockCurrentValueData } from "./market-fetcher";

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

        expect(data).toEqual(expectedData);
    });

    it('fetch stock-current-value', async () => {

        const fetcher = createMarketFetcher();

        const { paramsRaw, expectedData } = getStockHistoryValuesTestData();

        const data = await fetcher.fetchStockCurrentValue(paramsRaw.pairId);

        expect(data).toEqual<FetchStockCurrentValueData>(
            expect.arrayContaining(expectedData.map(({ pairId }): FetchStockCurrentValueData[ number ] => ({
                pairId,
                currentValue: expect.any(Object)
            })))
        );
    });

    it('fetch stock-search', async () => {

        const fetcher = createMarketFetcher();

        const { data } = await fetcher.fetchStockSearch('fdj');

        expect(data).toContainEqual(
            expect.objectContaining({
                pairId: 1155481,
                name: "La Francaise Des Jeux Sa",
                flag: "France",
                symbol: "FDJ",
            })
        );
    });
});

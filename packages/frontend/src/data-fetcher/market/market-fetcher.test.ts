import { createMarketFetcher } from "./market-fetcher";

describe('# market-fetcher', () => {

    it('fetch history', async () => {

        const fetcher = createMarketFetcher();

        const data = await fetcher.fetchHistory([ 997026 ]);

        expect(data).toEqual<typeof data>([ {
            id: 997026,
            history: expect.any(Array)
        } ]);
        expect(data[ 0 ].history).toHaveLength(254);
    });

    it('fetch current-value', async () => {

        const fetcher = createMarketFetcher();

        const data = await fetcher.fetchCurrentValue([ 997026 ]);

        expect(data).toEqual<typeof data>([
            {
                id: 997026,
                currentValue: expect.any(Object)
            }
        ]);
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

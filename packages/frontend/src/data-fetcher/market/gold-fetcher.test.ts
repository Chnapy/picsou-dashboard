import { createGoldFetcher } from './gold-fetcher';

describe('gold fetcher', () => {

    it('fetch history', async () => {
        const fetcher = createGoldFetcher();

        const data = await fetcher.fetchHistory([ 1 ]);

        expect(data).toEqual<typeof data>([ {
            id: 1,
            history: expect.any(Array)
        } ]);
        expect(data[ 0 ].history).toHaveLength(180);
    });

    it('fetch current value', async () => {
        const fetcher = createGoldFetcher();

        const data = await fetcher.fetchCurrentValue([ 1 ]);

        expect(data).toEqual<typeof data>([
            {
                id: 1,
                currentValue: expect.any(Object)
            }
        ]);
    });
});

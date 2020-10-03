
export const createGoldFetcher = () => {

    type GoldParams = {
        // version?: 'v2';
        // chartType?: 'CHART_POINTS';
        securityId: 'AUX' | 'AGX';  // AUX = gold, AGX = silver
        valuationSecurityId: 'EUR' | 'USD';

        // interval between values, in seconds
        interval: number;
    };

    const createGoldUrlParams = ({ interval }: Pick<GoldParams, 'interval'>) => ({
        securityId: 'AUX',
        valuationSecurityId: 'EUR',
        interval,
    });

    const goldUrl = 'https://www.galmarley.com/prices/prices.json';

    return {
        fetchGoldCurrentValue: async () => {

            const params = createGoldUrlParams({
                interval: 600
            });

            const url = new URL(goldUrl);

            Object.keys(params).forEach(k => {
                url.searchParams.set(k, (params as any)[k]);
            });

            return fetch(url.href);
        },
    }
};

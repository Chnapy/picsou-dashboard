import { BoardKind } from '@picsou/shared';
import { Fetcher } from './fetcher-types';
import { createGoldFetcher } from './market/gold-fetcher';
import { createMarketFetcher } from './market/market-fetcher';

type MainFetcher = {
    [B in BoardKind]: Fetcher;
};

const createFn = <MF extends MainFetcher>(fn: () => MF) => fn;

export const createMainFetcher = createFn(() => {

    return {
        gold: createGoldFetcher(),
        market: createMarketFetcher(),
        cash: createGoldFetcher(),  // TODO
    };
});

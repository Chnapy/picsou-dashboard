import { createMarketFetcher } from '../../data-fetcher/market/market-fetcher';
import { createMiddleware } from '../../main/create-middleware';
import { MainBoardInitAction } from './main-board-actions';


export const marketMiddleware = createMiddleware(() => api => next => {

    const fetcher = createMarketFetcher();

    setImmediate(async () => {

        const { data } = await fetcher.fetchInitialMarketData();

        api.dispatch(MainBoardInitAction(data));
    });

    return async action => {

        return next(action);
    };
});

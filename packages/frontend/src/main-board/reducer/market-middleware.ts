import { createMarketFetcher } from '../../data-fetcher/market/market-fetcher';
import { createMiddleware } from '../../main/create-middleware';
import { MainBoardInitAction, MainBoardRefreshAction } from './main-board-actions';


export const marketMiddleware = createMiddleware(() => api => next => {

    const fetcher = createMarketFetcher();

    setImmediate(async () => {

        // TODO do it for each board
        const { data } = await fetcher.fetchInitialMarketData();

        api.dispatch(MainBoardInitAction(data));

        setInterval(async () => {

            const marketList = api.getState().mainBoard.valuesList.market;

            const data = await fetcher.fetchStockCurrentValue(marketList);

            api.dispatch(MainBoardRefreshAction({
                board: 'market',
                data
            }));
        },
            // every 5 min
            5 * 60 * 1000
        );
    });

    return async action => {

        return next(action);
    };
});

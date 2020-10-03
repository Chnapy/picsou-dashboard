import { BoardKind, boardKindList, BoardValueInfos } from '@picsou/shared';
import { AuthSuccessAction } from '../../auth/reducer/auth-actions';
import { createMarketFetcher } from '../../data-fetcher/market/market-fetcher';
import { getFirebase } from '../../firebase/create-firebase-app';
import { createMiddleware } from '../../main/create-middleware';
import { normalize, NormalizeObject } from '../../util/normalize';
import { MainBoardEditLocalAction, MainBoardEditSuccessAction, MainBoardRefreshAction } from './main-board-actions';

type DBValueLine = Omit<BoardValueInfos, 'currentValue'>;

export const marketMiddleware = createMiddleware(() => api => next => {

    const fetcher = createMarketFetcher();

    const getDBValues = (board: BoardKind) => getFirebase().database().ref('values').child(board);

    const onAuthSuccess = async () => {

        boardKindList.forEach(board => {
            const dbValues = getDBValues(board);

            dbValues.on('value', async (childSnapshot) => {
                const valueLines: NormalizeObject<DBValueLine> = childSnapshot.val() ?? {};
                const ids = Object.keys(valueLines).map(Number);

                ids.forEach(id => {
                    valueLines[ id ].oldValueList = valueLines[ id ].oldValueList ?? [];
                });

                const currentValues = ids.length
                    // TODO use a global fetcher which handle all board kind
                    ? await fetcher.fetchStockCurrentValue(ids)
                    : [];

                const boardValues = normalize(
                    currentValues.map(({ pairId, currentValue }): BoardValueInfos => ({
                        ...valueLines[ pairId ],
                        id: pairId,
                        currentValue: currentValue.price
                    }))
                );

                api.dispatch(MainBoardEditSuccessAction({
                    board,
                    data: boardValues
                }));
            });
        });

        // TODO add interval for each board kind (not the same)
        setInterval(async () => {

            const marketList = api.getState().mainBoard.valuesList.market;

            if (marketList.length) {

                const data = await fetcher.fetchStockCurrentValue(marketList);

                api.dispatch(MainBoardRefreshAction({
                    board: 'market',
                    data
                }));
            }
        },
            // every 5 min
            5 * 60 * 1000
        );
    };

    const onLocalEdit = async ({ payload }: MainBoardEditLocalAction) => {
        const { board, data } = payload;

        const dbValues = getDBValues(board);

        await dbValues.set(data);

        // db listeners will do the rest
    };

    return async action => {

        const ret = next(action);

        if (AuthSuccessAction.match(action)) {
            await onAuthSuccess();
        }

        if (MainBoardEditLocalAction.match(action)) {
            await onLocalEdit(action);
        }

        return ret;
    };
});

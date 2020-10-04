import { BoardKind, boardKindList, BoardValueInfos } from '@picsou/shared';
import { AuthSuccessAction } from '../../auth/reducer/auth-actions';
import { createMainFetcher } from '../../data-fetcher/main-fetcher';
import { getFirebase } from '../../firebase/create-firebase-app';
import { createMiddleware } from '../../main/create-middleware';
import { normalize, NormalizeObject } from '../../util/normalize';
import { MainBoardEditLocalAction, MainBoardEditSuccessAction, MainBoardHistorySuccessAction, MainBoardRefreshAction, MainBoardValueSelectAction } from './main-board-actions';

type DBValueLine = Omit<BoardValueInfos, 'currentValue'>;

// TODO change to avoid conflicts
export const goldValueId = 1;

const getInitialGoldValue = (): NormalizeObject<BoardValueInfos> => ({
    [ goldValueId ]: {
        id: goldValueId,
        name: 'Gold',
        board: 'gold',
        oldValueList: [],
        currentValue: 0,
        history: []
    }
});

export const mainMiddleware = createMiddleware(() => api => next => {

    const mainFetcher = createMainFetcher();

    const getDBValues = (board: BoardKind) => getFirebase().database().ref('values').child(board);

    const onAuthSuccess = async () => {

        boardKindList.forEach(board => {
            const dbValues = getDBValues(board);
            const fetcher = mainFetcher[ board ];

            dbValues.on('value', async (childSnapshot) => {
                const valueLines: NormalizeObject<DBValueLine> = childSnapshot.val() ?? {};
                const ids = Object.keys(valueLines).map(Number);

                ids.forEach(id => {
                    valueLines[ id ].oldValueList = valueLines[ id ].oldValueList ?? [];
                });

                if (board === 'gold' && !ids.length) {
                    setImmediate(() => dbValues.set(getInitialGoldValue()));
                    return;
                }

                const currentValues = ids.length
                    ? await fetcher.fetchCurrentValue(ids)
                    : [];

                const boardValues = normalize(
                    currentValues.map(({ id, currentValue }): BoardValueInfos => ({
                        ...valueLines[ id ],
                        id,
                        currentValue: currentValue.price
                    }))
                );

                api.dispatch(MainBoardEditSuccessAction({
                    board,
                    data: boardValues
                }));
            });

            setInterval(async () => {

                const boardList = api.getState().mainBoard.valuesList[ board ];

                if (boardList.length) {

                    const { selectedValue } = api.getState().mainBoard.status[ board ];

                    if (!selectedValue) {

                        const data = await fetcher.fetchCurrentValue(boardList);

                        api.dispatch(MainBoardRefreshAction({
                            board,
                            data
                        }));
                    } else {

                        return chartRefresh(selectedValue, board);
                    }
                }
            },
                // every 5 min
                5 * 60 * 1000
            );
        });
    };

    const onLocalEdit = async ({ payload }: MainBoardEditLocalAction) => {
        const { board, data } = payload;

        const dbValues = getDBValues(board);

        await dbValues.set(data);

        // db listeners will do the rest
    };

    const chartRefresh = async (id: number, board: BoardKind) => {
        const fetcher = mainFetcher[ board ];

        const [ data ] = await fetcher.fetchHistory([ id ]);

        api.dispatch(MainBoardHistorySuccessAction({
            valueId: id,
            history: data
        }));
    }

    const onLocalChartRefresh = async ({ payload }: MainBoardValueSelectAction) => {
        const { board, valueId } = payload;

        if (!valueId) {
            return;
        }

        return chartRefresh(valueId, board);
    };

    return async action => {

        const ret = next(action);

        if (AuthSuccessAction.match(action)) {
            await onAuthSuccess();
        }

        if (MainBoardEditLocalAction.match(action)) {
            await onLocalEdit(action);
        }

        if (MainBoardValueSelectAction.match(action)) {
            await onLocalChartRefresh(action);
        }

        return ret;
    };
});

import { BoardKind } from '@picsou/shared';
import isToday from 'date-fns/isToday';
import { createAct } from '../../main/create-act';
import { MainBoardValueSelectAction } from '../reducer/main-board-actions';

export const selectValueAct = createAct(({ board, valueId }: {
    board: BoardKind;
    valueId: number | null;
}) => (dispatch, getState) => {

    const { auth, mainBoard } = getState();

    const { isVisitor } = auth;
    const { lastHistoryFetchTimes } = mainBoard.status[ board ];
    const loading = !isVisitor && !!valueId && !isToday(lastHistoryFetchTimes[ valueId ]!);

    dispatch(MainBoardValueSelectAction({
        board,
        valueId,
        loading
    }));
});

import { BoardKind, BoardValueInfos } from '@picsou/shared';
import { createRichReducer } from '../../main/create-rich-reducer';
import { NormalizeArray, NormalizeObject } from '../../util/normalize';
import { MainBoardInitAction, MainBoardRefreshAction } from './main-board-actions';


export type MainBoardState = {
    values: NormalizeObject<BoardValueInfos>;
    valuesList: {
        [ k in BoardKind ]: NormalizeArray<BoardValueInfos>;
    };
};

const initialState: MainBoardState = {
    values: {},
    valuesList: {
        cash: [],
        gold: [],
        market: [],
    }
};

export const mainBoardReducer = createRichReducer(initialState, () => ({
    [ MainBoardInitAction.type ]: (state, { payload }: MainBoardInitAction) => {
        payload.forEach(value => {
            state.values[ value.id ] = value;
            state.valuesList[ value.board ].push(value.id);
        });
    },
    [ MainBoardRefreshAction.type ]: (state, { payload }: MainBoardRefreshAction) => {
        payload.data.forEach(({ pairId, currentValue }) => {
            const { price } = currentValue;
            state.values[ pairId ].currentValue = price;
        });
    },
}));

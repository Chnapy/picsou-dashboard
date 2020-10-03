import { BoardKind, BoardValueInfos } from '@picsou/shared';
import { createRichReducer } from '../../main/create-rich-reducer';
import { NormalizeArray, NormalizeObject } from '../../util/normalize';
import { MainBoardEditSuccessAction, MainBoardRefreshAction } from './main-board-actions';


export type MainBoardState = {
    values: NormalizeObject<BoardValueInfos>;
    valuesList: {
        [ k in BoardKind ]: NormalizeArray<BoardValueInfos>;
    };
    status: {
        [ k in BoardKind ]: {
            loading: boolean;
        };
    };
    settings: {
        [ k in BoardKind ]: {
            editable?: boolean;
        };
    };
};

const initialState: MainBoardState = {
    values: {},
    valuesList: {
        cash: [],
        gold: [],
        market: [],
    },
    status: {
        cash: {
            loading: true
        },
        market: {
            loading: true
        },
        gold: {
            loading: true
        },
    },
    settings: {
        cash: {},
        market: {
            editable: true,
        },
        gold: {
            editable: true,
        },
    },
};

export const mainBoardReducer = createRichReducer(initialState, () => ({
    [ MainBoardRefreshAction.type ]: (state, { payload }: MainBoardRefreshAction) => {
        payload.data.forEach(({ pairId, currentValue }) => {
            const { price } = currentValue;
            state.values[ pairId ].currentValue = price;
        });
    },
    [ MainBoardEditSuccessAction.type ]: (state, { payload }: MainBoardEditSuccessAction) => {
        const { board, data } = payload;

        const previousIds = state.valuesList[ board ];
        const ids = Object.keys(data).map(Number);
        const removedIds = previousIds.filter(prevId => !ids.includes(prevId));

        state.valuesList[ board ] = ids;

        removedIds.forEach(id => {
            delete state.values[ id ];
        });

        Object.entries(data).forEach(([ k, v ]) => {
            state.values[ +k ] = { ...v };
        });

        state.status[board].loading = false;
    },
}));

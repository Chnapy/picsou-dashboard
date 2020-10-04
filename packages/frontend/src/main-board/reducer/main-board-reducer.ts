import { BoardKind, BoardValueInfos } from '@picsou/shared';
import { createRichReducer } from '../../main/create-rich-reducer';
import { NormalizeArray, NormalizeObject } from '../../util/normalize';
import { MainBoardEditSuccessAction, MainBoardHistorySuccessAction, MainBoardRefreshAction, MainBoardValueSelectAction } from './main-board-actions';


export type MainBoardState = {
    values: NormalizeObject<BoardValueInfos>;
    valuesList: {
        [ k in BoardKind ]: NormalizeArray<BoardValueInfos>;
    };
    status: {
        [ k in BoardKind ]: {
            loading: boolean;
            selectedValue?: number;
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
        payload.data.forEach(({ id, currentValue }) => {
            const { price } = currentValue;
            state.values[ id ].currentValue = price;
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

        state.status[ board ].loading = false;
    },
    [ MainBoardValueSelectAction.type ]: (state, { payload }: MainBoardValueSelectAction) => {
        const status = state.status[ payload.board ];
        status.loading = !!payload.valueId;
        status.selectedValue = payload.valueId ?? undefined;
    },
    [ MainBoardHistorySuccessAction.type ]: (state, { payload }: MainBoardHistorySuccessAction) => {
        const { valueId, history } = payload;

        const value = state.values[ valueId ];
        value.history = history.history;
        value.currentValue = history.history[ 0 ].price;
        state.status[ value.board ].loading = false;
    }
}));

import { BoardKind, BoardValueInfos } from '@picsou/shared';
import { createRichReducer } from '../../main/create-rich-reducer';
import { NormalizeArray, NormalizeObject } from '../../util/normalize';
import { MainBoardEditAction, MainBoardInitAction, MainBoardRefreshAction } from './main-board-actions';


export type MainBoardState = {
    values: NormalizeObject<BoardValueInfos>;
    valuesList: {
        [ k in BoardKind ]: NormalizeArray<BoardValueInfos>;
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
    settings: {
        cash: {},
        market: {
            editable: true,
        },
        gold: {},
    },
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
    [ MainBoardEditAction.type ]: ({ values, valuesList }, { payload }: MainBoardEditAction) => {
        Object.entries(payload.data).forEach(([ k, v ]) => {
            const key = +k;
            values[ key ] = {
                ...v,
                currentValue: values[ key ]?.currentValue ?? -1,
            };
            if(!valuesList[payload.board].includes(key)) {
                valuesList[payload.board].push(key);
            }
        });
    },
}));

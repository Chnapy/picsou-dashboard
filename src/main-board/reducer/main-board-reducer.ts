import { Normalizable, NormalizeObject, NormalizeArray } from '../../util/normalize';
import { createRichReducer } from '../../main/create-rich-reducer';

export type BoardKind = 'cash' | 'gold' | 'market';

type BoardValueInfos = Normalizable<string> & {
    board: BoardKind;
    oldValue: number;
    currentValue: number;
    quantity: number;
    quantityUnit: 'unit' | 'kg';
};

export type MainBoardState = {
    values: NormalizeObject<BoardValueInfos>;
    valuesList: {
        [k in BoardKind]: NormalizeArray<BoardValueInfos>;
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

}));

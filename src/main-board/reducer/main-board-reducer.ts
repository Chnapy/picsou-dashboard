import { Normalizable, NormalizeObject, NormalizeArray } from '../../util/normalize';
import { createRichReducer } from '../../main/create-rich-reducer';

export type BoardKind = typeof boardKindList[number];
export const boardKindList = ['cash', 'gold', 'market'] as const;

export type QuantityUnit = 'unit' | 'kg';

export type BoardValueInfos = Normalizable<string> & {
    board: BoardKind;
    oldValueList: {
        oldValue: number;
        quantity: number;
    }[];
    currentValue: number;
    quantityUnit: QuantityUnit;
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

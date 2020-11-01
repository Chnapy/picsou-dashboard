
export type BoardKind = typeof boardKindList[number];
export const boardKindList = ['cash', 'gold', 'market'] as const;

export type QuantityUnit = 'unit' | 'kg';

export type ValueBasicInfos = {
    id: number;
    name: string;
};

export type BoardValueInfos = ValueBasicInfos & {
    board: BoardKind;
    oldValueList: {
        oldValue: number;
        quantity: number;
    }[];
    currentValue: number;
    previousValue?: number;
    history: HistoryValue[];
};

export type HistoryValue = {
    price: number;
    time: number;
};

export type HistoryData = {
    id: number;
    history: HistoryValue[];
};

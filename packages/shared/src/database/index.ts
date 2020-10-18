import { BoardKind, BoardValueInfos } from '../board/board-types';

export type ReferentialHistoryData = {
    name: string;
};

export type ReferentialHistory = {
    [ time: number ]: number; // price
};

export type Database = {
    'white-list-uid': {
        [ uid: string ]: true;
    };

    values: {
        [ board in BoardKind ]: {
            [ id: number ]: Omit<BoardValueInfos, 'history'>;
        };
    };

    referentials: {
        cash: {
            values: {
                [ id: number ]: ReferentialHistoryData;
            };
            histories: {
                [ id: number ]: ReferentialHistory;
            };
            valuesIds: number[];
        };
    };
};

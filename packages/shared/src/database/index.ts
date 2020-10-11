import { BoardKind, BoardValueInfos } from '../board/board-types';

export type ReferentialHistoryData = {
    id: number;
    name: string;
    history: {
        [ time: number ]: number; // price
    }
};

export type Database = {
    'white-list-uid': {
        [uid: string]: true;
    };

    values: {
        [board in BoardKind]: {
            [id: number]: Omit<BoardValueInfos, 'history'>;
        };
    };

    referentials: {
        cash: {
            [ id: number ]: ReferentialHistoryData;
        };
    };
};

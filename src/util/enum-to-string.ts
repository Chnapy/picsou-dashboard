import { BoardKind, QuantityUnit } from '../main-board/reducer/main-board-reducer';
import { AppStepStateNoAuth } from '../app-step/reducer/app-step-reducer';
import { switchUtil } from './util';

const appStepMap: Record<AppStepStateNoAuth, string> = {
    main: 'Main',
};

const boardKindMap: Record<BoardKind, string> = {
    cash: 'Cash',
    gold: 'Gold',
    market: 'Market',
};

export const enumToString = {

    appStep: (value: AppStepStateNoAuth) => appStepMap[value],

    boardKind: (value: BoardKind) => boardKindMap[value],

    quantity: (value: number, unit: QuantityUnit) => switchUtil(unit, {
        unit: () => 'x' + value,
        kg: () => value + 'kg',
    })(),

};

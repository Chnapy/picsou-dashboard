import { BoardKind, QuantityUnit } from '@picsou/shared';
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

const boardUnit: Record<BoardKind, QuantityUnit> = {
    cash: 'unit',
    gold: 'kg',
    market: 'unit'
};

export const enumToString = {

    appStep: (value: AppStepStateNoAuth) => appStepMap[value],

    boardKind: (value: BoardKind) => boardKindMap[value],

    quantityUnit: (board: BoardKind) => boardUnit[board],

    quantity: (value: number, unit: QuantityUnit) => switchUtil(unit, {
        unit: () => 'x' + value,
        kg: () => value + 'kg',
    })(),

    shouldShowQuantity: (value: number, unit: QuantityUnit) => switchUtil(unit, {
        unit: () => value > 1,
        kg: () => true,
    })(),

};

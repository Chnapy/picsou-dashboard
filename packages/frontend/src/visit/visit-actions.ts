import { createAction } from '@reduxjs/toolkit';
import { MainBoardState } from '../main-board/reducer/main-board-reducer';

export type VisitEnterAction = ReturnType<typeof VisitEnterAction>;
export const VisitEnterAction = createAction('visit/enter');

export type VisitLoadDataAction = ReturnType<typeof VisitLoadDataAction>;
export const VisitLoadDataAction = createAction<Pick<MainBoardState, 'values' | 'valuesList' | 'status'>>('visit/load-data');

import { BoardKind, BoardValueInfos, HistoryData } from "@picsou/shared";
import { createAction } from "@reduxjs/toolkit";
import { FetchStockCurrentValueData } from '../../data-fetcher/market/market-fetcher';
import { InputBoardValueInfos } from '../../ui-components/dialog/edit-values-dialog';
import { NormalizeObject } from '../../util/normalize';

export type MainBoardRefreshAction = ReturnType<typeof MainBoardRefreshAction>;
export const MainBoardRefreshAction = createAction<{
    board: BoardKind;
    data: FetchStockCurrentValueData;
}>('main-board/refresh');

export type MainBoardEditLocalAction = ReturnType<typeof MainBoardEditLocalAction>;
export const MainBoardEditLocalAction = createAction<{
    board: BoardKind;
    data: NormalizeObject<InputBoardValueInfos>;
}>('main-board/edit/local');

export type MainBoardEditSuccessAction = ReturnType<typeof MainBoardEditSuccessAction>;
export const MainBoardEditSuccessAction = createAction<{
    board: BoardKind;
    data: NormalizeObject<BoardValueInfos>;
}>('main-board/edit/success');

export type MainBoardValueSelectAction = ReturnType<typeof MainBoardValueSelectAction>;
export const MainBoardValueSelectAction = createAction<{
    board: BoardKind;
    valueId: number | null;
    loading: boolean;
}>('main-board/value/select');

export type MainBoardHistorySuccessAction = ReturnType<typeof MainBoardHistorySuccessAction>;
export const MainBoardHistorySuccessAction = createAction<{
    valueId: number;
    history: HistoryData;
}>('main-board/history/success');

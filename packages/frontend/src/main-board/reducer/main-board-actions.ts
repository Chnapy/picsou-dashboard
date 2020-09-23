import { BoardKind, BoardValueInfos } from "@picsou/shared";
import { createAction } from "@reduxjs/toolkit";
import { FetchStockCurrentValueData } from '../../data-fetcher/market/market-fetcher';
import { InputBoardValueInfos } from '../../ui-components/dialog/edit-values-dialog';
import { NormalizeObject } from '../../util/normalize';

export type MainBoardInitAction = ReturnType<typeof MainBoardInitAction>;
export const MainBoardInitAction = createAction<BoardValueInfos[]>('main-board/init');

export type MainBoardRefreshAction = ReturnType<typeof MainBoardRefreshAction>;
export const MainBoardRefreshAction = createAction<{
    board: BoardKind;
    data: FetchStockCurrentValueData;
}>('main-board/refresh');

export type MainBoardEditAction = ReturnType<typeof MainBoardEditAction>;
export const MainBoardEditAction = createAction<{
    board: BoardKind;
    data: NormalizeObject<InputBoardValueInfos>;
}>('main-board/edit');

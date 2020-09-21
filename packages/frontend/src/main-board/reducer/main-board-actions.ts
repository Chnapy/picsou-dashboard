import { BoardKind, BoardValueInfos } from "@picsou/shared";
import { createAction } from "@reduxjs/toolkit";
import { FetchStockCurrentValueData } from '../../data-fetcher/market/market-fetcher';

export type MainBoardInitAction = ReturnType<typeof MainBoardInitAction>;
export const MainBoardInitAction = createAction<BoardValueInfos[]>('main-board/init');

export type MainBoardRefreshAction = ReturnType<typeof MainBoardRefreshAction>;
export const MainBoardRefreshAction = createAction<{
    board: BoardKind;
    data: FetchStockCurrentValueData;
}>('main-board/refresh');

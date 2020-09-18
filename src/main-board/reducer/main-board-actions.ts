import { createAction } from "@reduxjs/toolkit";
import { BoardValueInfos } from "../../../shared/types/board-types";

export type MainBoardInitAction = ReturnType<typeof MainBoardInitAction>;
export const MainBoardInitAction = createAction<BoardValueInfos[]>('main-board/init');

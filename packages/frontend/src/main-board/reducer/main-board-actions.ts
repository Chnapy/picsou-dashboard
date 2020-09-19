import { createAction } from "@reduxjs/toolkit";
import { BoardValueInfos } from "@picsou/shared";

export type MainBoardInitAction = ReturnType<typeof MainBoardInitAction>;
export const MainBoardInitAction = createAction<BoardValueInfos[]>('main-board/init');

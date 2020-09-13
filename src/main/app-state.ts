import { AppStepState } from '../app-step/reducer/app-step-reducer';
import { AuthState } from '../auth/reducer/auth-reducer';
import { MainBoardState } from '../main-board/reducer/main-board-reducer';

export type AppState = {

    appStep: AppStepState;

    auth: AuthState;

    mainBoard: MainBoardState;
};

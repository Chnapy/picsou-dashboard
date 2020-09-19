import { combineReducers } from '@reduxjs/toolkit';
import { appStepReducer } from '../app-step/reducer/app-step-reducer';
import { authReducer } from '../auth/reducer/auth-reducer';
import { mainBoardReducer } from '../main-board/reducer/main-board-reducer';
import { AppState } from './app-state';
import { StoreDependencies } from './store-manager';

export const rootReducer = (deps: StoreDependencies) => combineReducers<AppState>({
    appStep: appStepReducer(deps),
    auth: authReducer(deps),
    mainBoard: mainBoardReducer(deps),
});

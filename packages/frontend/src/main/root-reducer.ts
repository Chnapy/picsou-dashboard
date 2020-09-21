import { combineReducers } from '@reduxjs/toolkit';
import { appStepReducer } from '../app-step/reducer/app-step-reducer';
import { authReducer } from '../auth/reducer/auth-reducer';
import { mainBoardReducer } from '../main-board/reducer/main-board-reducer';
import { AppState } from './app-state';

export const rootReducer = () => combineReducers<AppState>({
    appStep: appStepReducer(),
    auth: authReducer(),
    mainBoard: mainBoardReducer(),
});

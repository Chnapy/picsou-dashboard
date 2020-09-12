import { combineReducers } from '@reduxjs/toolkit';
import { appStepReducer } from '../app-step/reducer/app-step-reducer';
import { authReducer } from '../auth/reducer/auth-reducer';
import { fooReducer } from '../foo/reducer/foo-reducer';
import { AppState } from './app-state';
import { StoreDependencies } from './store-manager';

export const rootReducer = (deps: StoreDependencies) => combineReducers<AppState>({
    appStep: appStepReducer(deps),
    foo: fooReducer(deps),
    auth: authReducer(deps),
});

import { combineReducers } from '@reduxjs/toolkit';
import { fooReducer } from '../foo/reducer/foo-reducer';
import { AppState } from './app-state';

export const rootReducer = combineReducers<AppState>({
    foo: fooReducer
});

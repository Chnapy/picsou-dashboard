import { CaseReducers, createReducer } from '@reduxjs/toolkit';
import { StoreDependencies } from './store-manager';

export const createRichReducer = <S, CR extends CaseReducers<S, any> = CaseReducers<S, any>>(
    initialState: S,
    actionsMapFn: (deps: StoreDependencies) => CR
) => (deps: StoreDependencies) => createReducer(initialState, actionsMapFn(deps));

import { CaseReducers, createReducer } from '@reduxjs/toolkit';

export const createRichReducer = <S, CR extends CaseReducers<S, any> = CaseReducers<S, any>>(
    initialState: S,
    actionsMapFn: () => CR
) => () => createReducer(initialState, actionsMapFn());

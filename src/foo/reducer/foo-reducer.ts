import { createReducer } from '@reduxjs/toolkit';
import { FooIncrementAction, FooDecrementAction } from './foo-actions';

export type FooState = number;

const initialState: FooState = 0;

export const fooReducer = createReducer(initialState, {
    [ FooIncrementAction.type ]: (state, { payload }: FooIncrementAction) => {
        return state + payload;
    },
    [ FooDecrementAction.type ]: (state, { payload }: FooDecrementAction) => {
        return state - payload;
    },
});

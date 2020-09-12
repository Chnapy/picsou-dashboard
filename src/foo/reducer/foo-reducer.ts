import { createRichReducer } from '../../main/create-rich-reducer';
import { FooDecrementAction, FooIncrementAction } from './foo-actions';

export type FooState = number;

const initialState: FooState = 0;

export const fooReducer = createRichReducer(initialState, () => ({
    [ FooIncrementAction.type ]: (state, { payload }: FooIncrementAction) => {
        return state + payload;
    },
    [ FooDecrementAction.type ]: (state, { payload }: FooDecrementAction) => {
        return state - payload;
    },
}));

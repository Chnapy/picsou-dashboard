import { createAction } from '@reduxjs/toolkit';

export type FooIncrementAction = ReturnType<typeof FooIncrementAction>;
export const FooIncrementAction = createAction<number>('foo/increment');

export type FooDecrementAction = ReturnType<typeof FooDecrementAction>;
export const FooDecrementAction = createAction<number>('foo/decrement');

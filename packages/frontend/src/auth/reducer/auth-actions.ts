import { createAction } from '@reduxjs/toolkit';

export type AuthSuccessAction = ReturnType<typeof AuthSuccessAction>;
export const AuthSuccessAction = createAction('auth/success');

export type AuthFailureAction = ReturnType<typeof AuthFailureAction>;
export const AuthFailureAction = createAction('auth/failure');

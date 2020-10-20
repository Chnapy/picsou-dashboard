import { createAction } from '@reduxjs/toolkit';

export type AuthSuccessAction = ReturnType<typeof AuthSuccessAction>;
export const AuthSuccessAction = createAction('auth/success');

export type AuthLogoutAction = ReturnType<typeof AuthLogoutAction>;
export const AuthLogoutAction = createAction('auth/logout');

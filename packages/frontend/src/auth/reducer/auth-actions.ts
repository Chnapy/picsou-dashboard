import { createAction } from '@reduxjs/toolkit';

export type AuthSuccessAction = ReturnType<typeof AuthSuccessAction>;
export const AuthSuccessAction = createAction('auth/success');

export type AuthLogoutAction = ReturnType<typeof AuthLogoutAction>;
export const AuthLogoutAction = createAction('auth/logout');

export type AuthErrorAction = ReturnType<typeof AuthErrorAction>;
export const AuthErrorAction = createAction<{ 
    title: string;
    content: string[] 
}>('auth/error');

export type AuthErrorRemoveAction = ReturnType<typeof AuthErrorRemoveAction>;
export const AuthErrorRemoveAction = createAction<{ id: number }>('auth/error/remove');

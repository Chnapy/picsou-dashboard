import { createReducer } from '@reduxjs/toolkit';
import { AuthLogoutAction, AuthSuccessAction } from './auth-actions';

export type AuthState = {
    isAuth: boolean;
    loading: boolean;
};

const getInitialState = (): AuthState => ({
    isAuth: false,
    loading: true
});

export const authReducer = () => createReducer(getInitialState(), {
    [ AuthSuccessAction.type ]: (state, action) => ({
        isAuth: true,
        loading: false
    }),
    [ AuthLogoutAction.type ]: (state, action) => ({
        isAuth: false,
        loading: false
    })
});

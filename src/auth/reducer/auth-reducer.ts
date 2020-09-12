import { createReducer } from '@reduxjs/toolkit';
import { StoreDependencies } from '../../main/store-manager';
import { AuthSuccessAction, AuthFailureAction } from './auth-actions';

export type AuthState = {
    firebaseAuth: firebase.auth.Auth;
    isAuth: boolean;
};

const getInitialState = ({ firebaseAuth }: StoreDependencies): AuthState => ({
    firebaseAuth,
    isAuth: !!firebaseAuth.currentUser,
});

export const authReducer = (deps: StoreDependencies) => createReducer(getInitialState(deps), {
    [ AuthSuccessAction.type ]: (state, action) => {
        state.isAuth = true;
    },
    [ AuthFailureAction.type ]: (state, action) => {
        state.isAuth = false;
    }
});

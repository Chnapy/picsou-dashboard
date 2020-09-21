import { createReducer } from '@reduxjs/toolkit';
import { getFirebase } from '../../firebase/create-firebase-app';
import { AuthFailureAction, AuthSuccessAction } from './auth-actions';

export type AuthState = {
    isAuth: boolean;
};

const getInitialState = (): AuthState => ({
    isAuth: !!getFirebase().auth().currentUser,
});

export const authReducer = () => createReducer(getInitialState(), {
    [ AuthSuccessAction.type ]: (state, action) => {
        state.isAuth = true;
    },
    [ AuthFailureAction.type ]: (state, action) => {
        state.isAuth = false;
    }
});

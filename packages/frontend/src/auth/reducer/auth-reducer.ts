import { createReducer } from '@reduxjs/toolkit';
import { VisitEnterAction } from '../../visit/visit-actions';
import { AuthErrorAction, AuthErrorRemoveAction, AuthLogoutAction, AuthSuccessAction } from './auth-actions';

export type AuthError = {
    id: number;
    title: string;
    content: string[];
};

export type AuthState = {
    isAuth: boolean;
    loading: boolean;
    isVisitor: boolean;
    errors: AuthError[];
};

const getInitialState = (): AuthState => ({
    isAuth: false,
    loading: true,
    isVisitor: false,
    errors: []
});

export const authReducer = () => createReducer(getInitialState(), {
    [ AuthSuccessAction.type ]: (state, action) => ({
        isAuth: true,
        loading: false,
        isVisitor: false,
        errors: []
    }),
    [ AuthLogoutAction.type ]: (state, action) => ({
        ...state,
        isAuth: false,
        isVisitor: false,
        loading: false
    }),
    [ AuthErrorAction.type ]: (state, { payload }: AuthErrorAction) => {
        state.errors = [
            ...state.errors,
            {
                id: Math.random(),
                ...payload
            }
        ];
    },
    [ AuthErrorRemoveAction.type ]: (state, { payload }: AuthErrorRemoveAction) => {
        state.errors = state.errors.filter(error => error.id !== payload.id);
    },
    [VisitEnterAction.type]: (state, action) => ({
        isAuth: false,
        loading: false,
        isVisitor: true,
        errors: []
    })
});

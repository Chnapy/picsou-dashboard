import { ThunkAction, Action } from '@reduxjs/toolkit';
import { AppState } from './app-state';

type AppThunkAction = ThunkAction<void, AppState, undefined, Action>;

export type Act<P> = (params: P) => AppThunkAction;

export const createAct = <P = void>(act: Act<P>) => act;

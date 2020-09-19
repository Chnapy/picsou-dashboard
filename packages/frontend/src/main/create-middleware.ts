import { Middleware } from '@reduxjs/toolkit';
import { AppState } from './app-state';
import { StoreDependencies } from './store-manager';

export const createMiddleware = (
    fn: (deps: StoreDependencies) => Middleware<{}, AppState>
) => fn;

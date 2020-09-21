import { Middleware } from '@reduxjs/toolkit';
import { AppState } from './app-state';

export const createMiddleware = (
    fn: () => Middleware<{}, AppState>
) => fn;

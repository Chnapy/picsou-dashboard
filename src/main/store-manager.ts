import { configureStore, getDefaultMiddleware, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { AppState } from './app-state';
import { rootReducer } from './root-reducer';
import { authMiddleware } from '../auth/reducer/auth-middleware';

export type StoreManager = ReturnType<typeof createStoreManager>;

export type StoreEmitter = Pick<StoreManager, 'getState' | 'dispatch'>;

export type StoreDependencies = {
    firebaseAuth: firebase.auth.Auth;
};

type Props = {
    firebaseApp: firebase.app.App;
    initialState?: AppState;
    middlewareList?: Middleware[];
};

const defaultMiddlewareList = (deps: StoreDependencies): Middleware[] => [
    authMiddleware(deps)
];

export const getFullStoreMiddlewareList = (deps: StoreDependencies, middlewareList: Middleware[] = defaultMiddlewareList(deps)) => {

    if (process.env.NODE_ENV === 'development') {
        const logger = createLogger({
            collapsed: true
        });

        middlewareList.push(logger);
    }

    return [
        ...getDefaultMiddleware({
            thunk: false,
            immutableCheck: process.env.NODE_ENV === 'test',
            serializableCheck: process.env.NODE_ENV === 'test'
        }),
        ...middlewareList
    ];
}

export const createStoreManager = ({
    firebaseApp,
    initialState,
    middlewareList
}: Props) => {
    
    const deps: StoreDependencies = {
        firebaseAuth: firebaseApp.auth(),
    };

    const store = configureStore({
        reducer: rootReducer(deps),
        middleware: getFullStoreMiddlewareList(deps, middlewareList),
        preloadedState: initialState
    });

    return {
        store,
        getState: store.getState,
        dispatch: store.dispatch
    };
};

import { configureStore, getDefaultMiddleware, Middleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { AppState } from './app-state';
import { rootReducer } from './root-reducer';

export type StoreManager = ReturnType<typeof createStoreManager>;

export type StoreEmitter = Pick<StoreManager, 'getState' | 'dispatch'>;

type Props = {
    initialState?: AppState;
    middlewareList?: Middleware[];
};

const defaultMiddlewareList = (): Middleware[] => [
];

export const getFullStoreMiddlewareList = (middlewareList: Middleware[] = defaultMiddlewareList()) => {

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
    initialState,
    middlewareList
}: Props) => {

    const store = configureStore({
        reducer: rootReducer,
        middleware: getFullStoreMiddlewareList(middlewareList),
        preloadedState: initialState
    });

    return {
        store,
        getState: store.getState,
        dispatch: store.dispatch
    };
};

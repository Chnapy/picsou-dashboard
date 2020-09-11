import React from 'react';
import { Provider } from 'react-redux';
import { FooView } from '../../foo/view/foo-view';
import { StoreManager } from '../store-manager';
import { UIThemeProvider } from './ui-theme-provider';

type ViewProps = {
    storeManager: StoreManager;
};

export const createView = ({ storeManager }: ViewProps) => {

    return <React.StrictMode>
        <Provider store={storeManager.store}>
            <UIThemeProvider>

                <FooView />

            </UIThemeProvider>
        </Provider>
    </React.StrictMode>;
};

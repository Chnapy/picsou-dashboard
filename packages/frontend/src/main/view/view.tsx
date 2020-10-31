import { Container } from '@material-ui/core';
import React from 'react';
import { Provider } from 'react-redux';
import { AppStepRouter } from '../../app-step/view/app-step-router';
import { StoreManager } from '../store-manager';
import { UIThemeProvider } from './ui-theme-provider';

type ViewProps = {
    storeManager: StoreManager;
};

export const createView = ({ storeManager }: ViewProps) => {

    return <React.StrictMode>
        <Provider store={storeManager.store}>
            <UIThemeProvider>

                <Container style={{ height: '100vh', overflow: 'auto' }}>

                    <AppStepRouter />

                </Container>

            </UIThemeProvider>
        </Provider>
    </React.StrictMode>;
};

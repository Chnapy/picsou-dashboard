import React from 'react';
import { Provider } from 'react-redux';
import { StoreManager } from '../store-manager';
import { UIThemeProvider } from './ui-theme-provider';
import { AppStepRouter } from '../../app-step/view/app-step-router';
import { Container } from '@material-ui/core';

type ViewProps = {
    storeManager: StoreManager;
};

export const createView = ({ storeManager }: ViewProps) => {

    return <React.StrictMode>
        <Provider store={storeManager.store}>
            <UIThemeProvider>

                <Container style={{height: '100vh'}}>

                <AppStepRouter />

                </Container>

            </UIThemeProvider>
        </Provider>
    </React.StrictMode>;
};

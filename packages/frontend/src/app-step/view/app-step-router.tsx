import React from 'react';
import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { switchUtil } from '../../util/util';
import { AppLoading } from './app-loading';

const AuthView = React.lazy(async () => {
    const component = (await import('../../auth/view/auth-view')).AuthView;
    return { default: component };
});

const MainBoardView = React.lazy(async () => {
    const component = (await import('../../main-board/view/main-board-view')).MainBoardView;
    return { default: component };
});

export const AppStepRouter: React.FC = () => {

    const appStep = useSelector(state => state.appStep);
    const loading = useSelector(state => state.auth.loading);

    if (loading) {
        return <AppLoading />;
    }

    return (
        <Suspense fallback={<AppLoading />}>
            {switchUtil(appStep, {
                auth: () => <AuthView />,
                main: () => <MainBoardView />
            })()}
        </Suspense>
    );
};

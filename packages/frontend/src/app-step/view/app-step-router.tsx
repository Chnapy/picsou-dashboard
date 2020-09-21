import React from 'react';
import { useSelector } from 'react-redux';
import { AuthView } from '../../auth/view/auth-view';
import { switchUtil } from '../../util/util';
import { MainBoardView } from '../../main-board/view/main-board-view';

export const AppStepRouter: React.FC = () => {

    const appStep = useSelector(state => state.appStep);

    return switchUtil(appStep, {
        auth: () => <AuthView/>,
        main: () => <MainBoardView />
    })();
};
